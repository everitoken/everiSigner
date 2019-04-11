// @ts-check
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

/**
 * API Sections
 */

// pass min extension version // guard in extension
window.everisigner = {
  getVersion() {
    throw new Error('Not supprted yet.')
  },

  getSupportedChains() {
    throw new Error('Not supprted yet.')
  },

  getSupportedActions() {
    throw new Error('Not supprted yet.')
  },

  // create sign provider
  createSignProvider: opts => config => {
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
