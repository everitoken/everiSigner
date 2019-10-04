import * as actions from '../action'
import { PURGE } from 'redux-persist/es/constants'

// Here only save the password hash
type AuthenticationStateType = {
  password?: string
}

type StateType = AuthenticationStateType

const defaultState: StateType = {
  password: undefined,
}

export default (
  state: StateType = defaultState,
  action: actions.StoreActionTypes
): StateType => {
  switch (action.type) {
    case actions.PASSWORD_SET:
      return {
        ...state,
        password: action.payload,
      }

    case actions.PASSWORD_REMOVE:
      return defaultState

    case PURGE:
      return defaultState

    default:
      return state
  }
}
