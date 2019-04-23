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
      const signature = get(payload, 'payload.signature', null)
      if (signature) {
        listener[0]([signature])
      } else {
        listener[1]('Sign failed')
      }
      removeListener(payload.id)
    } else if (type === 'everisigner/global/receive.supportedactions') {
      const listener = get(listeners, payload.id)
      listener[0](payload.actions || [])
      removeListener(payload.id)
    } else if (type === 'everisigner/global/receive.accounts') {
      const listener = get(listeners, payload.id)
      const accounts = get(payload, 'payload.accounts', [])
      listener[0](accounts)
      removeListener(payload.id)
    }
  },
  false
)

/**
 *
 * @param {string} type
 * @param {Object} data
 */
const localPostMessage = (type, data = {}) => {
  const id = uuid.v4()
  window.postMessage(
    {
      type,
      payload: {
        id,
        data: JSON.stringify({
          ...data,
          site: location.origin,
        }),
      },
    },
    '*'
  )

  // TODO implement timeout
  return new Promise((resolve, reject) => {
    registerListener(id, [resolve, reject])
  })
}

/**
 * API Sections
 */

// pass min extension version // guard in extension
window.everisigner = {
  getVersion() {
    throw new Error('Not supported yet.')
  },

  getAccounts() {
    return localPostMessage('everisigner/global/get.accounts')
  },

  getSupportedChains() {
    return ['everitoken']
  },

  getSupportedActions() {
    return localPostMessage('everisigner/global/get.supportedactions')
  },

  // create sign provider
  /**
   * @param {{message?: string, timeout?: number}} opts
   * @param {Object} data
   */
  createSignProvider: opts => data => {
    return localPostMessage('everisigner/global/sign', {
      buf: data.buf.toString('hex'),
      transaction: data.transaction,
      message: opts.message,
    })
  },
}
