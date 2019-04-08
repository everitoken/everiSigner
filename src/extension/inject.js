// initialize everiSigner client
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
    if (type === 'everisigner/global/signed') {
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
        type: 'everisigner/global/sign',
        payload: { id, data },
      })
      registerListener(id, resolve)
    })
  },
}
