// initialize everiSigner client
// this client will be init with a tag id, which will be verified in extension
import * as uuid from 'uuid'
import { get } from 'lodash'

let listeners = {}

const registerListener = (id, fn) => {
  listeners[id] = fn
}

const removeListener = id => {
  delete listeners[id]
}

window.addEventListener(
  'message',
  ev => {
    const { type, payload } = event.data
    // listens for signed message
    if (type === 'everisigner/signed') {
      const id = get(payload, 'id')
      const listener = get(listeners, id)

      // if there is a listener, invoke the listener with signed payload
      // then remove the listener
      if (listener) {
        listener(payload)
        removeListener(id)
      }
    }
  },
  false
)

window.everisigner = {
  sign: data => {
    return new Promise(resolve => {
      const id = uuid.v4()
      window.postMessage({
        type: 'everisigner/sign',
        payload: { id, data },
      })
      registerListener(id, resolve)
    })
  },
}
