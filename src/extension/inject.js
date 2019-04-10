// @ts-check
// initialize everiSigner client
import * as uuid from 'uuid'
import { get } from 'lodash'

let listeners = {}

/**
 *
 * @param {string} id
 * @param {[function, function]} fns
 */
const registerListener = (id, fns) => {
  listeners[id] = fns
}

/**
 *
 * @param {string} id
 */
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
        const signature = get(payload, 'payload.signature', null)

        if (signature) {
          listener[0]([signature])
        } else {
          listener[1]('Sign failed')
        }
        removeListener(id)
      }
    }
  },
  false
)

// get version
// get supported chain
// get supported action
// pass min extension version // guard in extension
// use function
window.everisigner = {
  signProvider: config => {
    const id = uuid.v4()
    window.postMessage(
      {
        type: 'everisigner/global/sign',
        payload: {
          id,
          data: JSON.stringify({
            buf: config.buf.toString('hex'),
            transaction: config.transaction,
          }),
        },
      },
      '*'
    )

    return new Promise((resolve, reject) => {
      registerListener(id, [resolve, reject])
    })
  },
}
