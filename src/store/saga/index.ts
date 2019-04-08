import { get } from 'lodash'
import { END, eventChannel } from 'redux-saga'
import { call, fork, put, select, take } from 'redux-saga/effects'
import * as PasswordService from '../../service/PasswordService'
import {
  BackgroundMsgTypes,
  BackgroundPasswordMsgType,
  PopupMsgTypes,
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

const postMessageToBackground = (message: PopupMsgTypes) =>
  backgroundPort && backgroundPort.postMessage(message)

function* waitBackgroundResponse(type: string) {
  const action: uiActions.BackgroundReceiveMessageType = yield take(
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

function* signHandler() {
  while (true) {
    log('signHandler')
    const action = yield take(
      (a: any) =>
        a.type === uiActions.RECEIVE_BACKGROUND_MESSAGE &&
        a.payload.type === 'background/sign'
    )

    log(JSON.stringify(action), 'fei')
    // postMessageToBackground({
    //   type: 'popup/signed',
    //   payload: {

    //   },
    // })
    // backgroundPort &&
    //   backgroundPort.postMessage({
    //     type: 'popup/signed',
    //     payload: { original: action, data: { signature: 'sig_whatnot' } },
    //   })
  }
}
function* createAccountHandler() {
  while (true) {
    const action: uiActions.CreateDefaultAccountType = yield take(
      uiActions.CREATE_DEFAULT_ACCOUNT
    )

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
    const action: uiActions.SetPasswordType = yield take([
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

function* backgroundChannelHandler(port: chrome.runtime.Port) {
  console.log('tring to setup backgroundchannelhandler')
  const chan = yield call(setupMessagingChannel, port)

  try {
    while (true) {
      const message: BackgroundMsgTypes = yield take(chan)
      log(JSON.stringify(message))

      // convert to redux action, so other watchers can "take" on
      yield put(uiActions.receiveBackgroundMessage(message))
    }
  } finally {
  }
}

function* setupMessagingChannel(port: chrome.runtime.Port) {
  return eventChannel(emitter => {
    port.onMessage.addListener(msg => {
      console.log('eventChannel', msg)
      emitter(msg)
    })

    port.onDisconnect.addListener(() => {
      console.log('eventChannel, disconnect')
      emitter(END)
    })

    return () => {
      console.log('eventChannel, disconnect is called')
      port.disconnect()
      backgroundPort = null
    }
  })
}

function* rootSaga() {
  try {
    // do some cleanup on popup unload
    yield call(setupPopupUnloadListener)

    // if (backgroundPort === null) {
    backgroundPort = chrome.runtime.connect({ name: 'background' })
    // setup background channel, this needs to be called before waiting on any background message
    yield fork(backgroundChannelHandler, backgroundPort)
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
    // }

    yield fork(signHandler)
    yield fork(createAccountHandler)
    yield fork(setPasswordHandler)
  } catch (e) {
    // TODO consider restart saga
    console.log('saga root error: ', e)
  }
}

export default rootSaga
