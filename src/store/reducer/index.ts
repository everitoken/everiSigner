import { combineReducers } from 'redux'
import accounts from './accounts'
import authentication from './authentication'
import airport from './airport'
import message from './message'
import signingPayload from './signingPayload'
import network from './network'
import authorizedEntities from './authorizedEntities'

const rootReducer = combineReducers({
  airport,
  authentication,
  accounts,
  network,
  message,
  signingPayload,
  authorizedEntities,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
