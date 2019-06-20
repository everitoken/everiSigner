// @ts-check
import * as uuid from 'uuid'
import { get, omit } from 'lodash'

let listeners = {}
let timeoutListeners = {}

/**
 *
 * @param {string} id uuid of the request
 * @param {function} reject promise reject
 * @param {number} timeout milliseconds
 */
const registerTimeout = (id, reject, timeout) => {
  timeoutListeners[id] = setTimeout(() => {
    reject('Timeout')
  }, timeout)
}

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

/**
 *
 * @param {string|undefined} id
 */
const removeTimeoutListener = id => {
  if (id && timeoutListeners[id]) {
    clearTimeout(timeoutListeners[id])
    delete timeoutListeners[id]
  }
}

window.addEventListener(
  'message',
  ev => {
    const { type, payload } = event.data
    // listens for signed message

    if (type === 'everisigner/global/signCancelled') {
      const id = get(payload, 'id')
      const listener = get(listeners, id)
      listener[1]('Signing is cancelled on user side')
      removeTimeoutListener(id)
    }

    if (type === 'everisigner/global/signed') {
      const id = get(payload, 'id')
      const listener = get(listeners, id)

      // if there is a listener, invoke the listener with signed payload
      // then remove the listener
      const signature = get(payload, 'payload.signature', null)
      if (signature) {
        listener[0]([signature])
      } else {
        listener[1]('Failed to extract signature')
      }
      removeListener(payload.id)
      removeTimeoutListener(payload.id)
    } else if (type === 'everisigner/global/receive.supportedactions') {
      const listener = get(listeners, payload.id)
      listener[0](payload.actions || [])
      removeListener(payload.id)
      removeTimeoutListener(payload.id)
    } else if (type === 'everisigner/global/receive.accounts') {
      const listener = get(listeners, payload.id)
      const accounts = get(payload, 'payload.accounts', [])
      listener[0](accounts)
      removeListener(payload.id)
      removeTimeoutListener(payload.id)
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
  const timeout = data.timeout || 1000 * 20
  window.postMessage(
    {
      type,
      payload: {
        id,
        data: JSON.stringify({
          ...data,
          site: location.origin,
          title: window.document.title,
        }),
      },
    },
    '*'
  )

  // TODO implement timeout
  return new Promise((resolve, reject) => {
    registerListener(id, [resolve, reject])
    registerTimeout(id, reject, timeout)
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
   * @param {{addresses: string[], message?: string, timeout?: number}} opts
   */
  createSignProvider: opts => data =>
    localPostMessage('everisigner/global/sign', {
      buf: data.buf.toString('hex'),
      payload: { transaction: data.transaction, actions: data.actions },
      message: opts.message,
      addresses: opts.addresses || [],
    }),
}
