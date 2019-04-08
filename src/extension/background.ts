import {
  BackgroundMethodsInterface,
  BackgroundMsgTypes,
  PopupMsgTypes,
  PopupPasswordSetMsgType,
  PopupStartedMsgType,
  PopupStartPasswordTimerMsgType,
  ClientLocalMsgTypes,
  PopupSignedMsgType,
} from '../types'
import { isPopMessage, isClientMessage } from '../util/background'

let password: string | null = null
let timerHandler: number | null = null
const TIMEOUT = 1000 * 60 * 15

const setPassword = (newPassword: string) => {
  password = newPassword
}

const removePassword = () => {
  password = null
}

// Handle popup state
// it is only start communicating after popup.html is initialized
let popupStarted = false

const popupStart = () => {
  popupStarted = true
  return undefined
}
const isPopupStarted = () => {
  return popupStarted === true
}
const resetPopup = () => {
  popupStarted = false
  return undefined
}

const backgroundMethods: BackgroundMethodsInterface = {
  startTimer: (milliseconds: number = TIMEOUT) => {
    if (timerHandler) {
      clearTimeout(timerHandler)
      timerHandler = null
    }

    console.log('password timeout timer started with timeout:', milliseconds)

    timerHandler = setTimeout(() => {
      removePassword()
      clearTimeout(timerHandler)
      timerHandler = null
    }, milliseconds)
  },
}

// popup is closed
const disconnectHandler = (port: chrome.runtime.Port) => {
  // TODO or trigger a count down
  resetPopup()
  console.log('background', 'disconnectHandler')
  port.disconnect()
}

type PostMessageType = (msg: BackgroundMsgTypes) => void

const passwordSetHandler = (
  message: PopupPasswordSetMsgType,
  postMessage: PostMessageType
) => {
  setPassword(message.payload)
  console.log('password is set to ', password)
  postMessage({
    type: 'background/passwordSaved',
  })
}

const popupStartedHandler = (
  _: PopupStartedMsgType,
  postMessage: PostMessageType
) => {
  console.log('popupStartedHandler', password)
  postMessage({ type: 'background/password', payload: { password } })
}

const passwordTimerHandler = (
  _: PopupStartPasswordTimerMsgType,
  postMessage: PostMessageType
) => {
  postMessage({ type: 'background/passwordTimerSet' })
}

const signedHandler = (
  message: PopupSignedMsgType,
  postMessage: PostMessageType
) => {
  postMessage({ type: 'background/signed', payload: message.payload })
}

const handleClientMessage = (
  message: ClientLocalMsgTypes,
  postMessage: PostMessageType
) => {
  switch (message.type) {
    case 'everisigner/local/sign':
      postMessage({ type: 'background/sign', payload: message.payload })
      break

    default:
      return
  }
}

const handlePopupMessage = (
  message: PopupMsgTypes,
  postMessage: PostMessageType
) => {
  switch (message.type) {
    case 'popup/passwordset':
      passwordSetHandler(message, postMessage)
      break
    case 'popup/started':
      popupStartedHandler(message, postMessage)
      break
    case 'popup/startPasswordTimer': // currently unused
      passwordTimerHandler(message, postMessage)
      break
    case 'popup/signed':
      signedHandler(message, postMessage)
      break
    default:
      postMessage({
        type: 'background/error',
        payload: `Unsupported type ${JSON.stringify(message)}`,
      })

      break
  }
}

// setup communication channel
chrome.runtime.onConnect.addListener(function(port) {
  //   console.assert(port.name == "background");
  const postMessage: PostMessageType = msg => port.postMessage(msg)
  port.onMessage.addListener((message: PopupMsgTypes | ClientLocalMsgTypes) => {
    if (port.name === 'background' && isPopMessage(message.type)) {
      const localMessageWithType = message as PopupMsgTypes
      if (localMessageWithType.type === 'popup/started') {
        popupStart()
      }

      // don't do anything if popup is not initialized
      if (!isPopupStarted()) {
        return
      }

      // start handling message based on types
      handlePopupMessage(localMessageWithType, postMessage)
      return
    }

    if (port.name === 'client' && isClientMessage(message.type)) {
      const localMessageWithType = message as ClientLocalMsgTypes
      handleClientMessage(localMessageWithType, postMessage)
      return
    }

    throw new Error(`Message type is not supported: ${message.type}`)
  })

  port.onDisconnect.addListener(disconnectHandler)
})

window.everisigner = backgroundMethods
