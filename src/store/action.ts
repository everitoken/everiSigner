import { PURGE } from 'redux-persist/es/constants'
import { AccountStateType } from './reducer/accounts'
import { ToBeSignDataType, SignedDataType, MessageMetaType } from '../types'

export const ACCOUNT_CREATE = 'store/ACCOUNT_CREATE'
export const PASSWORD_SET = 'store/PASSWORD_SET'
export const PASSWORD_REMOVE = 'store/PASSWORD_REMOVE'
export const PLANE_LAND = 'store/PLANE_LAND'
export const PLANE_TAKEOFF = 'store/PLANE_TAKEOFF'
export const SNACKBAR_MESSAGE_SHOW = 'SNACKBAR_MESSAGE_SHOW'
export const SNACKBAR_MESSAGE_DISMISS = 'SNACKBAR_MESSAGE_DISMISS'
export const SIGNING_PAYLOAD_RECEIVE = 'SIGNING_PAYLOAD_RECEIVE'
export const SIGNED_PAYLOAD_RECEIVE = 'SIGNED_PAYLOAD_RECEIVE'

export interface SignedPayloadReceiveType {
  type: typeof SIGNED_PAYLOAD_RECEIVE
  payload: SignedDataType
}

export interface SigningPayloadReceiveType {
  type: typeof SIGNING_PAYLOAD_RECEIVE
  payload: ToBeSignDataType
  meta?: MessageMetaType
}

export interface SnackbarMessageShowType {
  type: typeof SNACKBAR_MESSAGE_SHOW
  payload: { message: string; variant: string }
}

export interface SnackbarMessageDismissType {
  type: typeof SNACKBAR_MESSAGE_DISMISS
}

export interface PurgeType {
  type: typeof PURGE
}

export interface AccountCreateType {
  type: typeof ACCOUNT_CREATE
  payload: AccountStateType
}

export interface PasswordSetType {
  type: typeof PASSWORD_SET
  payload: string
}

export interface PasswordRemoveType {
  type: typeof PASSWORD_REMOVE
}

export interface PlaneLandType {
  type: typeof PLANE_LAND
  payload: { name: string; value: any }
}

export interface PlaneTakeoffType {
  type: typeof PLANE_TAKEOFF
  payload: string
}

export const landPlane = (name: string, value: any): PlaneLandType => ({
  type: PLANE_LAND,
  payload: { name, value },
})

export const takeOffPlane = (name: string): PlaneTakeoffType => ({
  type: PLANE_TAKEOFF,
  payload: name,
})

export const passwordSet = (hash: string): PasswordSetType => ({
  type: PASSWORD_SET,
  payload: hash,
})

export const passwordRemove = (): PasswordRemoveType => ({
  type: PASSWORD_REMOVE,
})

export const accountCreate = (
  account: AccountStateType
): AccountCreateType => ({
  type: ACCOUNT_CREATE,
  payload: account,
})

export const snackbarMessageShow = (
  message: string,
  variant: string = 'info'
): SnackbarMessageShowType => ({
  type: SNACKBAR_MESSAGE_SHOW,
  payload: { message, variant },
})

export const snackbarMessageDismiss = (): SnackbarMessageDismissType => ({
  type: SNACKBAR_MESSAGE_DISMISS,
})

export const signingPayloadReceive = (
  payload: ToBeSignDataType,
  meta?: MessageMetaType
) => ({
  type: SIGNING_PAYLOAD_RECEIVE,
  payload,
  meta,
})

export const signedPayloadReceive = (payload: SignedDataType) => ({
  type: SIGNED_PAYLOAD_RECEIVE,
  payload,
})

export type StoreActionTypes =
  | AccountCreateType
  | PasswordSetType
  | PasswordRemoveType
  | PlaneLandType
  | SnackbarMessageShowType
  | SnackbarMessageDismissType
  | PurgeType
  | PlaneTakeoffType
  | SigningPayloadReceiveType
  | SignedPayloadReceiveType
