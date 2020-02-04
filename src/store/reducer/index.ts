import { combineReducers } from 'redux'
import accounts from './accounts'
import authentication from './authentication'
import airport from './airport'
import signingPayload from './signingPayload'
import authorizedEntities from './authorizedEntities'
import settings from './settings'

const rootReducer = combineReducers({
  airport,
  authentication,
  accounts,
  signingPayload,
  authorizedEntities,
  settings,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
