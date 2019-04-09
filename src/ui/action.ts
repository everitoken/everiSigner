import { ToBeSignDataType, BackgroundMsgTypes } from '../types'

export const SET_PASSWORD = 'ui/SET_PASSWORD'
export const LOG_IN = 'ui/LOG_IN'
export const RECEIVE_BACKGROUND_MESSAGE = 'background/RECEIVE_MESSAGE'
export const CREATE_DEFAULT_ACCOUNT = 'CREATE_DEFAULT_ACCOUNT'
export const SIGN = 'SIGN'

export type SignType = {
  type: typeof SIGN
  payload: ToBeSignDataType
}

export type CreateDefaultAccountType = {
  type: typeof CREATE_DEFAULT_ACCOUNT
  payload: { id: string; name: string }
}

export type SetPasswordType = {
  type: typeof SET_PASSWORD
  payload: string
}

export type LogInType = {
  type: typeof LOG_IN
  payload: string
}

export type BackgroundReceiveMessageType = {
  type: typeof RECEIVE_BACKGROUND_MESSAGE
  payload: BackgroundMsgTypes
}

export type UiActionTypes =
  | SetPasswordType
  | LogInType
  | CreateDefaultAccountType
  | SignType

export type BackgroundActionTypes = BackgroundReceiveMessageType

export const sign = (payload: ToBeSignDataType) => ({
  type: SIGN,
  payload,
})
export const setPassword = (password: string): UiActionTypes => ({
  type: SET_PASSWORD,
  payload: password,
})

export const logIn = (password: string): LogInType => ({
  type: LOG_IN,
  payload: password,
})

export const createDefaultAccount = (
  id: string,
  name: string
): CreateDefaultAccountType => ({
  type: CREATE_DEFAULT_ACCOUNT,
  payload: { id, name },
})

export const receiveBackgroundMessage = (
  msg: BackgroundMsgTypes
): BackgroundReceiveMessageType => ({
  type: RECEIVE_BACKGROUND_MESSAGE,
  payload: msg,
})
