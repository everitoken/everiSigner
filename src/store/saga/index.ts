import { get } from 'lodash'
import { END, eventChannel } from 'redux-saga'
import parseUrl from 'parse-url'
import { call, fork, put, select, take, all } from 'redux-saga/effects'
import * as PasswordService from '../../service/PasswordService'
import { imageDataUriMap } from '../../asset'
import {
  BackgroundMsgTypes,
  BackgroundPasswordMsgType,
  BalanceType,
  NetworkItemType,
} from '../../types'
import * as uiActions from '../../ui/action'
import * as storeActions from '../action'
import {
  getPassword,
  getPasswordHash,
  getAuthenticateAccountRequest,
  getNetworks,
} from '../getter'
import { AccountStateType } from '../reducer/accounts'
import storeProvider from '../provider'
import ChainApi from '../../chain'
import { getEvtChain } from '../../chain/util'
import ChainInterface from '../../chain/ChainInterface'
import StoreProviderInterface from '../ProviderInterface'
import labels from '../../labels'
import { NetworkStateType } from '../reducer/network'

let backgroundPort: chrome.runtime.Port | null = null
let chain: ChainApi | null = null

const log = (msg: string, tag: string = 'unspecified') => {
  const background = chrome.extension.getBackgroundPage()
  background && background.console.log(`popup(${tag}): `, msg)
}

function setupChainProviders(network: NetworkItemType) {
  const provider: StoreProviderInterface | null = storeProvider.get()

  const chainNetwork = {
    host: network.url
      .replace(/\/$/, '')
      .replace(/^https:\/\//, '')
      .replace(/^http:\/\//, ''),
    port: network.url.startsWith('https') ? 443 : 80,
    protocol: network.url.startsWith('https') ? 'https' : 'http',
  }

  const fallbackNetwork = {
    host: 'mainnet14.everitoken.io',
    port: 443,
    protocol: 'https',
  }

  if (provider != null) {
    chain = new ChainApi(provider, chainNetwork || fallbackNetwork)
  }
}

function* waitBackgroundResponse(type: string) {
  const action: ReturnType<
    typeof uiActions.receiveBackgroundMessage
  > = yield take(
    (a: any) =>
      a.type === uiActions.RECEIVE_BACKGROUND_MESSAGE && a.payload.type === type
  )
  return action.payload
}

function setupPopupUnloadListener() {
  const background = chrome.extension.getBackgroundPage()

  addEventListener(
    'unload',
    () => {
      background && background.window.everisigner.startTimer()
    },
    true
  )
}

function* fetchBalanceWatcher() {
  while (true) {
    const action: ReturnType<typeof uiActions.fetchBalance> = yield take(
      uiActions.FETCH_BALANCE
    )

    if (!chain) {
      break
    }

    yield put(storeActions.landPlane('balance/fetching', true))

    const evtChain: ChainInterface = yield call(getEvtChain, chain)
    // get all balances by public key
    const rawBalances: string[] = yield evtChain.getBalancesByPublicKey(
      action.payload.publicKey
    )

    // parse balance to get symbol id
    const rawBalanceArray = rawBalances.map(balance => {
      const parts = balance.split(' ')

      return {
        id: Number(parts[1].split('#')[1]),
        value: parts[0],
      }
    })

    // get details of all symbol id
    const details = yield all(
      rawBalanceArray.map(function*(balance) {
        return yield evtChain.getFungibleDetail(balance.id)
      })
    )

    // organize output
    const balanceData: BalanceType[] = details.map(
      (balance: any, i: number) => {
        const id = rawBalanceArray[i].id
        const logoMeta = balance.metas.find(
          (meta: any) => meta.key === 'symbol-icon'
        )
        return {
          id,
          displayName: balance.name,
          logoDataUri:
            imageDataUriMap[String(id)] || logoMeta || imageDataUriMap.default,
          name: balance.sym_name,
          value: rawBalanceArray[i].value,
        }
      }
    )

    yield put(
      storeActions.landPlane(`balance/${action.payload.publicKey}`, [
        ...balanceData,
      ])
    )

    yield put(storeActions.landPlane('balance/fetching', false))
  }
}

function* backgroundMessageWatcher() {
  while (true) {
    const action: { payload: BackgroundMsgTypes } = yield take(
      (a: any) => a.type === uiActions.RECEIVE_BACKGROUND_MESSAGE
    )

    const { payload } = action

    if (payload.type === 'background/sign') {
      yield put(
        storeActions.signingPayloadReceive(payload.payload, payload.meta)
      )
    }

    if (payload.type === 'background/get.accounts') {
      yield put(storeActions.landPlane('get/accounts', payload))
    }

    if (payload.type === 'background/synced') {
      yield put(storeActions.landPlane('uiready', true))
    }
  }
}

function* authorizeAccountAccessHandler() {
  while (true) {
    const action: ReturnType<
      typeof uiActions.authorizeAccountAccess
    > = yield take(uiActions.AUTHORIZE_ACCOUNT_ACCESS)

    const { request } = yield select(getAuthenticateAccountRequest)
    const { account } = action.payload

    const signedPayload = {
      id: request.payload.id,
      payload: {
        original: request.payload.data,
        accounts:
          account == null
            ? []
            : [{ name: account.name, publicKey: account.publicKey }],
      },
      meta: request.meta,
    }

    backgroundPort &&
      backgroundPort.postMessage({
        type: 'popup/receive.accounts',
        payload: signedPayload,
      })
  }
}

function* signHandler() {
  while (true) {
    const action = yield take(uiActions.SIGN)
    let data = null

    // skip direct when chain is not setup
    if (!chain) {
      break
    }

    try {
      data = JSON.parse(action.payload.payload.data)
    } catch (e) {
      break
    }

    const evtChain: ChainInterface = yield call(getEvtChain, chain)

    // get private key from default account
    const signature = yield evtChain.signHash(
      new Buffer(data.buf, 'hex'),
      async storeProvider => {
        const account = await storeProvider.getDefaultAccount()
        return account.privateKey
      }
    )

    const signedPayload = {
      id: action.payload.payload.id,
      payload: {
        original: action.payload.payload.data,
        signature,
      },
      meta: action.payload.meta,
    }

    backgroundPort &&
      backgroundPort.postMessage({
        type: 'popup/signed',
        payload: signedPayload,
      })

    yield put(storeActions.signedPayloadReceive(signedPayload))
  }
}

function* importAccountHandler() {
  while (true) {
    const action: ReturnType<typeof uiActions.importAccount> = yield take(
      uiActions.IMPORT_ACCOUNT
    )

    if (!chain) {
      break // TODO refactor away
    }

    // construct words
    // 1. get password
    const password: string | false = yield select(getPassword)

    if (!password) {
      alert('Invalid password, Default account creation failed')
      return
    }

    const evtChain: ChainInterface = yield call(getEvtChain, chain)

    const { id, privateKey, name } = action.payload

    const publicKey = yield evtChain.getPublicKeyFromPrivateKey(
      action.payload.privateKey
    )

    // construct state
    const account: AccountStateType = {
      id,
      name,
      type: 'imported',
      isMain: false,
      createdAt: new Date().toISOString(),
      words: '',
      privateKey,
      publicKey,
    }

    yield put(
      storeActions.accountCreate(
        PasswordService.encryptAccount(password, account)
      )
    )

    yield put(
      storeActions.snackbarMessageShow('Successfully imported account.')
    )
  }
}

function* createAccountHandler() {
  while (true) {
    const action: ReturnType<typeof uiActions.createSeedAccount> = yield take(
      uiActions.CREATE_SEED_ACCOUNT
    )

    if (!chain) {
      break // TODO refactor away
    }

    // construct words
    // 1. get password
    const password: string | false = yield select(getPassword)

    if (!password) {
      alert('Invalid password, Default account creation failed')
      return
    }

    // 3. generate entropy
    const seed = PasswordService.mnemonicToSeed(action.payload.words)

    const evtChain: ChainInterface = yield call(getEvtChain, chain)

    const privateKey = yield evtChain.generateSeedPrivateKey(() =>
      Promise.resolve(seed.toString('hex'))
    )

    const publicKey = yield evtChain.getPublicKeyFromPrivateKey(privateKey)

    // construct state
    const account: AccountStateType = {
      ...action.payload,
      type: 'seed',
      isMain: true,
      createdAt: new Date().toISOString(),
      privateKey,
      publicKey,
    }

    yield put(
      storeActions.accountCreate(
        PasswordService.encryptAccount(password, account)
      )
    )

    yield put(
      storeActions.snackbarMessageShow('Successfully created default account.')
    )
  }
}

function* setMainAccountWatcher() {
  while (true) {
    const action: ReturnType<typeof uiActions.setMainAccount> = yield take(
      uiActions.SET_MAIN_ACCOUNT
    )

    yield put(storeActions.mainAccountSet(action.payload.account))
  }
}

function* removeAccountWatcher() {
  while (true) {
    const action: ReturnType<typeof uiActions.removeAccount> = yield take(
      uiActions.REMOVE_ACCOUNT
    )

    yield put(storeActions.accountRemove(action.payload.account))
  }
}

function* addCustomNetworkWatcher() {
  while (true) {
    const action: ReturnType<typeof uiActions.addCustomNetwork> = yield take(
      uiActions.ADD_CUSTOM_NETWORK
    )

    yield put(storeActions.networkAdd(action.payload.network))
    yield put(
      storeActions.snackbarMessageShow(labels.NETWORK_SUCCESSFULLY_CREATED)
    )
  }
}

function* removeCustomNetworkWatcher() {
  while (true) {
    const action: ReturnType<typeof uiActions.removeNetwork> = yield take(
      uiActions.REMOVE_CUSTOM_NETWORK
    )

    yield put(storeActions.networkRemove(action.payload.network))
  }
}

function* setPasswordWatcher() {
  while (true) {
    const action: ReturnType<typeof uiActions.setPassword> = yield take([
      uiActions.SET_PASSWORD,
      uiActions.LOG_IN,
    ])

    const { payload: password } = action

    // hash password with bcrypt
    const hash = PasswordService.hashPassword(password)
    console.log(hash)

    // store hash in store
    yield put(storeActions.passwordSet(hash))
    yield put(storeActions.landPlane('password', password))

    // send password to background.js
    backgroundPort &&
      backgroundPort.postMessage({
        type: 'popup/passwordset',
        payload: password,
      })
  }
}

function* copyToClipBoardWatcher() {
  while (true) {
    const action: ReturnType<typeof uiActions.copyToClipboard> = yield take(
      uiActions.COPY_TO_CLIPBOARD
    )

    try {
      yield call([navigator.clipboard, 'writeText'], action.payload)
      yield put(storeActions.snackbarMessageShow(labels.COPIED_TO_CLIPBOARD))
    } catch (e) {
      yield put(
        storeActions.snackbarMessageShow(labels.FAILED_COPIED_TO_CLIPBOARD)
      )
    }
  }
}

function* backgroundSendMessageChannelHandler() {
  const chan = yield call(setupSendMessageChannel)

  try {
    while (true) {
      const message: BackgroundMsgTypes = yield take(chan)

      // convert to redux action, so other watchers can "take" on
      yield put(uiActions.receiveBackgroundMessage(message))
    }
  } finally {
  }
}

// chrome.runtime.onMessage.addListener(handleClientRequest)
function* setupSendMessageChannel() {
  return eventChannel(emitter => {
    const messageHandler = (msg: BackgroundMsgTypes) => emitter(msg)
    chrome.runtime.onMessage.addListener(msg => {
      messageHandler(msg)
      return true
    })

    return () => {
      chrome.runtime.onMessage.removeListener(messageHandler)
    }
  })
}

function* backgroundChannelHandler(port: chrome.runtime.Port) {
  const chan = yield call(setupMessagingChannel, port)

  try {
    while (true) {
      const message: BackgroundMsgTypes = yield take(chan)

      // convert to redux action, so other watchers can "take" on
      yield put(uiActions.receiveBackgroundMessage(message))
    }
  } finally {
  }
}

function* setupMessagingChannel(port: chrome.runtime.Port) {
  return eventChannel(emitter => {
    port.onMessage.addListener(msg => {
      emitter(msg)
    })

    port.onDisconnect.addListener(() => {
      emitter(END)
    })

    return () => {
      //   port.disconnect()
      backgroundPort = null
    }
  })
}

function* rootSaga() {
  try {
    // do some cleanup on popup unload
    yield call(setupPopupUnloadListener)
    yield fork(backgroundMessageWatcher)

    if (backgroundPort === null) {
      backgroundPort = chrome.runtime.connect()
      // setup background channel, this needs to be called before waiting on any background message
      yield fork(backgroundChannelHandler, backgroundPort)
      yield fork(backgroundSendMessageChannelHandler)

      // tell background that pop up is started
      backgroundPort.postMessage({ type: 'popup/started' })

      // At initialize phase need to perform a handshake. The background.js will let popup know
      // what is the current state.
      // 1. background.js has a password
      //    1.1 verify password with hash and store in the state
      // 2. background.js doesn't have a password
      //    2.1 if local has a password hash, popup should be locked
      //    2.2 if local doesn't have a password hash, app is not initialized with a password
      const bgMsgPassword: BackgroundPasswordMsgType = yield call(
        waitBackgroundResponse,
        'background/password'
      )

      const password = get(bgMsgPassword.payload, 'password', null)

      const passwordHash = yield select(getPasswordHash)

      if (password !== null && passwordHash !== null) {
        // verify password from background against local password hash
        const isPasswordValid = PasswordService.verifyPassword(
          password,
          passwordHash
        )

        if (!isPasswordValid) {
          // if not lock
          yield put(storeActions.passwordRemove())
        } else {
          yield put(storeActions.landPlane('password', password))
        }
      }

      backgroundPort.postMessage({
        type: 'popup/initialized',
      })
    }
    const { selected }: NetworkStateType = yield select(getNetworks)

    yield fork(createAccountHandler)
    yield fork(importAccountHandler)
    yield fork(setPasswordWatcher)
    yield fork(signHandler)
    yield fork(authorizeAccountAccessHandler)
    yield fork(setupChainProviders, selected) // NOTE expose `chain` global to saga/index
    yield fork(fetchBalanceWatcher)
    yield fork(copyToClipBoardWatcher)
    yield fork(setMainAccountWatcher)
    yield fork(removeAccountWatcher)
    yield fork(addCustomNetworkWatcher)
    yield fork(removeCustomNetworkWatcher)
  } catch (e) {
    // TODO consider restart saga
    console.log('saga root error: ', e)
  }
}

export default rootSaga
