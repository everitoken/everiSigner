const port = chrome.runtime.connect({ name: 'client' })

const listeners = {}

window.addEventListener(
  'message',
  function(event) {
    const { type } = event.data
    if (type === 'everisigner/sign') {
      port.postMessage(event.data)
      console.log('setting timeout')
      setTimeout(() => {
        window.postMessage(
          {
            type: 'everisigner/signed',
            payload: { id: event.data.payload.id, data: 'gibberish' },
          },
          '*'
        )
      }, 3000)
    }
  },
  false
)

port.onMessage.addListener(message => {
  console.log('message', message)
})

port.postMessage({ type: 'client/requestId' })

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
