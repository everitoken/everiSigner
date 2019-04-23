import { ClientLocalMsgTypes, ClientGlobalMsgTypes } from '../types'

const port = chrome.runtime.connect({ name: 'client' })

// Post message to `background.js`
const postLocalMessage = (msg: ClientLocalMsgTypes) => port.postMessage(msg)

// Here relay to message from `host dom` to `background.js`
window.addEventListener(
  'message',
  ev => {
    const { type, payload } = ev.data
    if (type === 'everisigner/global/sign') {
      postLocalMessage({ type: 'everisigner/local/sign', payload })
    } else if (type === 'everisigner/global/get.supportedactions') {
      postLocalMessage({
        type: 'everisigner/local/get.supportedactions',
        payload,
      })
    } else if (type === 'everisigner/global/get.accounts') {
      postLocalMessage({
        type: 'everisigner/local/get.accounts',
        payload,
      })
    }
  },
  false
)

// post the message back to the `everisigner app`
const postGlobalMessage = (msg: ClientGlobalMsgTypes) =>
  window.postMessage(msg, '*')

// here listens the message sent from `background.js` and relay it to `host dom`
chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'background/signed') {
    postGlobalMessage({
      type: 'everisigner/global/signed',
      payload: message.payload,
    })
  } else if (message.type === 'background/get.supportedactions') {
    postGlobalMessage({
      type: 'everisigner/global/receive.supportedactions',
      payload: message.payload,
    })
  } else if (message.type === 'background/receive.accounts') {
    postGlobalMessage({
      type: 'everisigner/global/receive.accounts',
      payload: message.payload,
    })
  }
})

// inject `inject.js` to dom which initialize the everisigner app
const inject = () => {
  const script = document.createElement('script')
  script.src = chrome.extension.getURL('extension/inject.js')
  ;(document.head || document.documentElement).appendChild(script)
  script.onload = () => {
    script.remove()
  }
}

inject()
