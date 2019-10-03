import { combineReducers } from 'redux'
import accounts from './accounts'
import authentication from './authentication'
import airport from './airport'
import signingPayload from './signingPayload'
import authorizedEntities from './authorizedEntities'

const rootReducer = combineReducers({
  airport,
  authentication,
  accounts,
  signingPayload,
  authorizedEntities,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
