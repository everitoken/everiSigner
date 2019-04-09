import { ToBeSignDataType, BackgroundMsgTypes, MessageMetaType } from '../types'

export const SET_PASSWORD = 'ui/SET_PASSWORD'
export const LOG_IN = 'ui/LOG_IN'
export const RECEIVE_BACKGROUND_MESSAGE = 'background/RECEIVE_MESSAGE'
export const CREATE_DEFAULT_ACCOUNT = 'CREATE_DEFAULT_ACCOUNT'
export const SIGN = 'SIGN'

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
