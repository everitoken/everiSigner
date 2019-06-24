import {
  BackgroundMethodsInterface,
  BackgroundMsgTypes,
  PopupMsgTypes,
  PopupPasswordSetMsgType,
  PopupStartedMsgType,
  PopupInitializedMsgType,
  ClientLocalMsgTypes,
  PopupSignedMsgType,
  PopupReceiveAccountsMsgType,
  PopupSignCancelledMsgType,
} from '../types'
import { isPopMessage, isClientMessage } from '../util/background'
import { get } from 'lodash'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../style'

const supportedActions: string[] = ['transferft']
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
  removePassword,
  startTimer: (milliseconds: number = TIMEOUT) => {
    if (timerHandler) {
      clearTimeout(timerHandler)
      timerHandler = null
    }

    timerHandler = setTimeout(() => {
      removePassword()
      clearTimeout(timerHandler)
      timerHandler = null
    }, milliseconds)
  },
}

// popup is closed
const disconnectHandler = (port: chrome.runtime.Port) => {
  resetPopup()
  port.disconnect()
}

type PostMessageType = (msg: BackgroundMsgTypes) => void

const passwordSetHandler = (
  message: PopupPasswordSetMsgType,
  postMessage: PostMessageType
) => {
  setPassword(message.payload)
  postMessage({
    type: 'background/passwordSaved',
  })
}

const popupStartedHandler = (
  _: PopupStartedMsgType,
  postMessage: PostMessageType
) => {
  postMessage({ type: 'background/password', payload: { password } })
}

const popupInitialized = (
  _: PopupInitializedMsgType,
  postMessage: PostMessageType
) => {
  postMessage({ type: 'background/synced' })
}

const signedHandler = (message: PopupSignedMsgType, _: PostMessageType) => {
  const tabId = get(message, 'payload.meta.tabId', null)

  if (tabId) {
    chrome.tabs.sendMessage(tabId, {
      type: 'background/signed',
      payload: message.payload,
    })
  }
}

const signCancelledHandler = (
  message: PopupSignCancelledMsgType,
  _: PostMessageType
) => {
  const tabId = get(message, 'payload.meta.tabId', null)

  if (tabId) {
    chrome.tabs.sendMessage(tabId, {
      type: 'background/signCancelled',
      payload: message.payload,
    })
  }
}

const receiveAccountHandler = (message: PopupReceiveAccountsMsgType) => {
  const tabId = get(message, 'payload.meta.tabId', null)

  if (tabId) {
    chrome.tabs.sendMessage(tabId, {
      type: 'background/receive.accounts',
      payload: message.payload,
    })
  }
}

const handleClientMessage = (message: ClientLocalMsgTypes) => {
  switch (message.type) {
    case 'everisigner/local/sign':
      chrome.windows.create(
        {
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT + 40,
          url: chrome.extension.getURL('extension/prompt.html'),
          type: 'popup',
          focused: true,
        },
        () => {
          chrome.runtime.onConnect.addListener(port => {
            port.onMessage.addListener((msg: PopupMsgTypes) => {
              if (msg.type === 'popup/started') {
                port.postMessage({
                  type: 'background/sign',
                  payload: message.payload,
                  meta: message.meta,
                })
              }
            })
          })
        }
      )
      break
    case 'everisigner/local/get.accounts':
      chrome.windows.create(
        {
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT + 40,
          url: chrome.extension.getURL('extension/account_select.html'),
          type: 'popup',
          focused: true,
        },
        () => {
          chrome.runtime.onConnect.addListener(port => {
            port.onMessage.addListener((msg: PopupMsgTypes) => {
              if (msg.type === 'popup/started') {
                port.postMessage({
                  type: 'background/get.accounts',
                  payload: message.payload,
                  meta: message.meta,
                })
              }
            })
          })
        }
      )
      break
    case 'everisigner/local/get.supportedactions':
      if (message.meta && message.meta.tabId) {
        chrome.tabs.sendMessage(message.meta.tabId, {
          type: 'background/get.supportedactions',
          payload: {
            ...message.payload,
            actions: supportedActions,
          },
        })
      }
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
    case 'popup/initialized':
      popupInitialized(message, postMessage)
      break
    case 'popup/signed':
      signedHandler(message, postMessage)
      break
    case 'popup/signCancelled':
      signCancelledHandler(message, postMessage)
      break
    case 'popup/receive.accounts':
      receiveAccountHandler(message)
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
  const postMessage: PostMessageType = msg => port.postMessage(msg)

  port.onMessage.addListener(
    (message: PopupMsgTypes | ClientLocalMsgTypes, sender) => {
      const tabId = get(sender, 'sender.tab.id', null)

      if (isPopMessage(message.type)) {
        const localMessageWithType = message as PopupMsgTypes

        if (localMessageWithType.type === 'popup/started') {
          popupStart()
        }

        // don't do anything if popup is not initialized
        if (!isPopupStarted()) {
          return
        }

        handlePopupMessage(localMessageWithType, postMessage)
      } else if (isClientMessage(message.type)) {
        // only data from client side (client app) needs tabId,
        // so background.js knows where to send back the data
        const localMessageWithType = {
          ...message,
          meta: { tabId },
        } as ClientLocalMsgTypes

        handleClientMessage(localMessageWithType)
      } else {
        throw new Error(`Message type is not supported: ${message.type}`)
      }
    }
  )

  port.onDisconnect.addListener(disconnectHandler)
})

window.everisigner = backgroundMethods
