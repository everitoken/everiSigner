import * as React from 'react'
import { useLocalStorageState } from 'react-storage-hooks'

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
type State = AccountStateType[]

export const ACCOUNT_CREATE = 'CREATE'
export const MAIN_ACCOUNT_SET = 'SET_MAIN'
export const ACCOUNT_REMOVE = 'REMOVE'

export interface MainAccountSetType {
  type: typeof MAIN_ACCOUNT_SET
  payload: AccountStateType
}
export interface AccountCreateType {
  type: typeof ACCOUNT_CREATE
  payload: AccountStateType
}
export interface AccountRemoveType {
  type: typeof ACCOUNT_REMOVE
  payload: AccountStateType
}

type Action = AccountCreateType | MainAccountSetType | AccountRemoveType

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACCOUNT_CREATE:
      const hasMainAccount = state.find(({ isMain }) => isMain)
      return [...state, { ...action.payload, isMain: !hasMainAccount }]

    case MAIN_ACCOUNT_SET:
      return state.map(account => ({
        ...account,
        isMain: account.id === action.payload.id,
      }))

    case ACCOUNT_REMOVE:
      if (!action.payload.isMain) {
        return state.filter(account => account.id !== action.payload.id)
      }

      const [first, ...accounts] = state.filter(
        account => account.id !== action.payload.id
      )

      const newMainAccount = { ...first, isMain: true }
      return [newMainAccount, ...accounts]

    default:
      return state
  }
}

type AccountOperationType = (account: AccountStateType) => void

function useAccounts(): [
  AccountStateType[],
  AccountOperationType,
  AccountOperationType,
  AccountOperationType
] {
  const [initialState, persist] = useLocalStorageState('accounts', [])
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const create: AccountOperationType = account =>
    dispatch({
      type: ACCOUNT_CREATE,
      payload: account,
    })
  const setMain: AccountOperationType = account =>
    dispatch({
      type: MAIN_ACCOUNT_SET,
      payload: account,
    })

  const remove: AccountOperationType = account =>
    dispatch({
      type: ACCOUNT_REMOVE,
      payload: account,
    })

  return [state, create, setMain, remove]
}

export default useAccounts
