import {
  ClientLocalMsgTypes,
  BackgroundMsgTypes,
  ClientGlobalMsgTypes,
} from '../types'

const port = chrome.runtime.connect({ name: 'background' })

const postLocalMessage = (msg: ClientLocalMsgTypes) => port.postMessage(msg)

window.addEventListener(
  'message',

  ev => {
    const { type, payload } = ev.data
    if (type === 'everisigner/global/sign') {
      console.log('Received local sign from inject.js', ev.data)
      postLocalMessage({ type: 'everisigner/local/sign', payload })
    }
  },
  false
)

const postGlobalMessage = (msg: ClientGlobalMsgTypes) =>
  window.postMessage(msg, '*')
port.onMessage.addListener((message: BackgroundMsgTypes) => {
  // listen for "background/signed" message
  if (message.type === 'background/signed') {
    postGlobalMessage({
      type: 'everisigner/global/signed',
      payload: message.payload,
    })
  }
})

// inject `inject.js` to dom
const inject = () => {
  const script = document.createElement('script')
  script.src = chrome.extension.getURL('extension/inject.js')
  ;(document.head || document.documentElement).appendChild(script)
  script.onload = () => {
    script.remove()
  }
}

// call this with key requested from background.js
inject()
