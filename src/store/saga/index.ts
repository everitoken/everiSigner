import { get } from 'lodash'
import { END, eventChannel } from 'redux-saga'
import { call, fork, put, select, take } from 'redux-saga/effects'
import * as PasswordService from '../../service/PasswordService'
import {
  BackgroundMsgTypes,
  BackgroundPasswordMsgType,
  BackgroundSignMsgType,
} from '../../types'
import * as uiActions from '../../ui/action'
import * as storeActions from '../action'
import { getPassword, getPasswordHash } from '../getter'
import { AccountStateType } from '../reducer/accounts'

let backgroundPort: chrome.runtime.Port | null = null

const log = (msg: string, tag: string = 'unspecified') => {
  const background = chrome.extension.getBackgroundPage()
  background && background.console.log(`popup(${tag}): `, msg)
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
      try {
        background && background.window.everisigner.startTimer(5000)
      } catch (e) {}
    },
    true
  )
}

function* signWatcher() {
  while (true) {
    const action: { payload: BackgroundSignMsgType } = yield take(
      (a: any) =>
        a.type === uiActions.RECEIVE_BACKGROUND_MESSAGE &&
        a.payload.type === 'background/sign'
    )

    yield put(
      storeActions.signingPayloadReceive(
        action.payload.payload,
        action.payload.meta
      )
    )
  }
}

function* signHandler() {
  while (true) {
    const action = yield take(uiActions.SIGN)

    backgroundPort &&
      backgroundPort.postMessage({
        type: 'popup/signed',
        payload: {
          id: action.payload.payload.id,
          payload: {
            original: action.payload.payload.data,
            signature: 'dummy',
          },
          meta: action.payload.meta,
        },
      })
  }
}
function* createAccountHandler() {
  while (true) {
    const action: ReturnType<
      typeof uiActions.createDefaultAccount
    > = yield take(uiActions.CREATE_DEFAULT_ACCOUNT)

    // construct words
    // 1. get password
    const password: string | false = yield select(getPassword)

    if (!password) {
      alert('Invalid password, Default account creation failed')
      return
    }

    // 2. get mnemonic
    const words = PasswordService.generateMnemonicWords(password, 'english')

    // 3. generate entropy
    const seed = PasswordService.mnemonicToSeed(password, words)

    // construct state
    const account: AccountStateType = {
      ...action.payload,
      type: 'default',
      createdAt: new Date(),
      privateKey: seed.toString('hex'),
      words,
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

function* setPasswordHandler() {
  while (true) {
    const action: ReturnType<typeof uiActions.setPassword> = yield take([
      uiActions.SET_PASSWORD,
      uiActions.LOG_IN,
    ])

    const { payload: password } = action

    // hash password with bcrypt
    const hash = PasswordService.hashPassword(password)

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
    chrome.runtime.onMessage.addListener((msg, sender) => {
      log(JSON.stringify(sender, null, 4), 'sender')
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

      const password = get(bgMsgPassword.payload, 'data.password', null)
      log(JSON.stringify(password))

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
          log('password valid')
          yield put(storeActions.landPlane('password', password))
          // start password lock timer
          backgroundPort.postMessage({
            type: 'popup/startPasswordTimer',
          })
        }
      }
    }

    yield fork(signWatcher)
    yield fork(createAccountHandler)
    yield fork(setPasswordHandler)
    yield fork(signHandler)
  } catch (e) {
    // TODO consider restart saga
    console.log('saga root error: ', e)
  }
}

export default rootSaga
