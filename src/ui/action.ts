import { ToBeSignDataType, BackgroundMsgTypes, MessageMetaType } from '../types'
import { AccountStateType } from '../store/reducer/accounts'

export const SET_PASSWORD = 'ui/SET_PASSWORD'
export const LOG_IN = 'ui/LOG_IN'
export const RECEIVE_BACKGROUND_MESSAGE = 'background/RECEIVE_MESSAGE'
export const CREATE_DEFAULT_ACCOUNT = 'ui/CREATE_DEFAULT_ACCOUNT'
export const SIGN = 'ui/SIGN'
export const AUTHORIZE_ACCOUNT_ACCESS = 'ui/AUTHORIZE_ACCOUNT_ACCESS'
export const FETCH_BALANCE = 'ui/FETCH_BALANCE'

export const sign = (payload: {
  payload: ToBeSignDataType
  meta?: MessageMetaType
}) => ({
  type: SIGN,
  payload,
})
export const setPassword = (password: string) => ({
  type: SET_PASSWORD,
  payload: password,
})

export const logIn = (password: string) => ({
  type: LOG_IN,
  payload: password,
})

export const createDefaultAccount = (id: string, name: string) => ({
  type: CREATE_DEFAULT_ACCOUNT,
  payload: { id, name },
})

export const receiveBackgroundMessage = (msg: BackgroundMsgTypes) => ({
  type: RECEIVE_BACKGROUND_MESSAGE,
  payload: msg,
})

export const authorizeAccountAccess = (
  account: AccountStateType | null,
  raw: any
) => ({
  type: AUTHORIZE_ACCOUNT_ACCESS,
  payload: {
    account,
    raw,
  },
})

export const fetchBalance = (publicKey: string) => ({
  type: FETCH_BALANCE,
  payload: {
    publicKey,
  },
})
