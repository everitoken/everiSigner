const port = chrome.runtime.connect({ name: 'client' })

window.addEventListener(
  'message',
  function(event) {
    // We only accept messages from ourselves
    console.log(event.data)
    if (event.data.type && event.data.type == 'background/setClientId') {
      console.log('Content script received: ', event.data.payload)
      //   port.postMessage(event.data.payload)
    }
  },
  false
)

port.onMessage.addListener(message => {
  console.log('message', message)
})

port.postMessage({ type: 'client/requestId' })

// inject `inject.js` to dom
const inject = (id: string) => {
  const script = document.createElement('script')
  script.src = chrome.extension.getURL('extension/inject.js')
  ;(document.head || document.documentElement).appendChild(script)
  script.onload = () => {
    // const customEvent = new CustomEvent('everisigner/init', {
    //   detail: { id },
    // })

    // window.document.dispatchEvent(customEvent)

    script.remove()
  }
}

// call this with key requested from background.js
inject('1')
