import { PURGE } from 'redux-persist/es/constants'
import { AccountStateType } from './reducer/accounts'
import {
  ToBeSignDataType,
  SignedDataType,
  MessageMetaType,
  NetworkItemType,
} from '../types'

export const ACCOUNT_CREATE = 'store/ACCOUNT_CREATE'
export const MAIN_ACCOUNT_SET = 'store/MAIN_ACCOUNT_SET'
export const ACCOUNT_REMOVE = 'store/ACCOUNT_REMOVE'
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

export const PASSWORD_SET = 'store/PASSWORD_SET'
export const PASSWORD_REMOVE = 'store/PASSWORD_REMOVE'
export const PLANE_LAND = 'store/PLANE_LAND'
export const PLANE_TAKEOFF = 'store/PLANE_TAKEOFF'
export const SIGNING_PAYLOAD_RECEIVE = 'SIGNING_PAYLOAD_RECEIVE'
export const SIGNED_PAYLOAD_RECEIVE = 'SIGNED_PAYLOAD_RECEIVE'
export const NETWORK_SELECT = 'store/NETWORK_SELECT'
export const NETWORK_ADD = 'store/NETWORK_ADD'
export const NETWORK_REMOVE = 'store/NETWORK_REMOVE'
export const AUTHORIZED_ENTITY_ADD = 'store/AUTHORIZED_ENTITY_ADD'

export interface SignedPayloadReceiveType {
  type: typeof SIGNED_PAYLOAD_RECEIVE
  payload: SignedDataType
}

export interface SigningPayloadReceiveType {
  type: typeof SIGNING_PAYLOAD_RECEIVE
  payload: ToBeSignDataType
  meta?: MessageMetaType
}

export interface PurgeType {
  type: typeof PURGE
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

export interface NetworkSelectType {
  type: typeof NETWORK_SELECT
  payload: { network: NetworkItemType }
}

export interface NetworkAddType {
  type: typeof NETWORK_ADD
  payload: { network: NetworkItemType }
}

export interface NetworkRemoveType {
  type: typeof NETWORK_REMOVE
  payload: { network: NetworkItemType }
}

export interface AuthorizedEntityAddType {
  type: typeof AUTHORIZED_ENTITY_ADD
  payload: { host: string }
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

export const signingPayloadReceive = (
  payload: ToBeSignDataType,
  meta?: MessageMetaType
): SigningPayloadReceiveType => ({
  type: SIGNING_PAYLOAD_RECEIVE,
  payload,
  meta,
})

export const signedPayloadReceive = (
  payload: SignedDataType
): SignedPayloadReceiveType => ({
  type: SIGNED_PAYLOAD_RECEIVE,
  payload,
})

export const networkRemove = (network: NetworkItemType): NetworkRemoveType => ({
  type: NETWORK_REMOVE,
  payload: {
    network,
  },
})

export const accountCreate = (
  account: AccountStateType
): AccountCreateType => ({
  type: ACCOUNT_CREATE,
  payload: account,
})
export const mainAccountSet = (
  account: AccountStateType
): MainAccountSetType => ({
  type: MAIN_ACCOUNT_SET,
  payload: account,
})

export const accountRemove = (
  account: AccountStateType
): AccountRemoveType => ({
  type: ACCOUNT_REMOVE,
  payload: account,
})

export const authorizedEntityAdd = (payload: {
  host: string
}): AuthorizedEntityAddType => ({
  type: AUTHORIZED_ENTITY_ADD,
  payload,
})

export type StoreActionTypes =
  | AccountCreateType
  | MainAccountSetType
  | AccountRemoveType
  | PasswordSetType
  | PasswordRemoveType
  | PlaneLandType
  | PurgeType
  | PlaneTakeoffType
  | SigningPayloadReceiveType
  | SignedPayloadReceiveType
  | NetworkSelectType
  | NetworkAddType
  | NetworkRemoveType
  | AuthorizedEntityAddType
