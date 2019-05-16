import {
  ACCOUNT_CREATE,
  StoreActionTypes,
  MAIN_ACCOUNT_SET,
  ACCOUNT_REMOVE,
} from '../action'
import { PURGE } from 'redux-persist'

export type AccountStateType = {
  type: 'seed' | 'imported'
  isMain: boolean
  words: string
  privateKey: string
  publicKey: string
  id: string
  name: string
  createdAt: string
}

type StateType = AccountStateType[]

const defaultState: StateType = []

export default (
  state: StateType = defaultState,
  action: StoreActionTypes
): StateType => {
  switch (action.type) {
    case ACCOUNT_CREATE:
      return [...state, action.payload]

    case MAIN_ACCOUNT_SET:
      return state.map(account => ({
        ...account,
        isMain: account.id === action.payload.id,
      }))
    case ACCOUNT_REMOVE:
      return state.filter(account => account.id !== action.payload.id)

    case PURGE:
      return defaultState
    default:
      return state
  }
}
