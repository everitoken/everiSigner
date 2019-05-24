import * as actions from '../action'
import { PURGE } from 'redux-persist/es/constants'
import { AuthorizedEntity } from '../../types'

type AuthorizedEntitiesStateType = AuthorizedEntity[]

type StateType = AuthorizedEntitiesStateType

const defaultState: StateType = []

export default (
  state: StateType = defaultState,
  action: actions.StoreActionTypes
): StateType => {
  switch (action.type) {
    case actions.AUTHORIZED_ENTITY_ADD:
      return [
        ...state,
        {
          ...action.payload,
          authorizedAt: new Date().toISOString(),
        },
      ]

    case PURGE:
      return defaultState

    default:
      return state
  }
}
