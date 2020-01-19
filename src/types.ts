export type ActionNameSupportedTypes = 'transferft'
export type ValidAuthenticatedStatusTypes = 'password' | 'hash' | 'unknown'
export type StartScreenNameType = 'GET_STARTED' | 'HOME' | 'LOGIN'

export type NFTType = {
  domain: string
  name: string
}

export interface TokenDetail {
  id: number
  displayName: string
  precision: number
  name: string
  logoDataUri: string
  value: string
}

export type ToBeSignDataType = {
  id: string
  from: number
  data: string
}
export type SignedDataType = {
  id: string
  payload: {
    original: string
    signature: string
  }
}

export type AccountDataType = {
  id: string
  payload: {
    original: string
    account: { name: string; publicKey: string }
  }
}

// TODO: check native types
export interface WithRouterType {
  history: any
  match: any
  location: any
}

/* Popup message types */
export type PopupPasswordSetMsgType = {
  type: 'popup/passwordset'
  payload: string
  meta?: MessageMetaType
}

export type PopupReceiveAccountsMsgType = {
  type: 'popup/receive.accounts'
  payload: AccountDataType
  meta?: MessageMetaType
}

export type PopupStartedMsgType = {
  type: 'popup/started'
  payload: null
  meta?: MessageMetaType
}

export type PopupSignedMsgType = {
  type: 'popup/signed'
  payload: SignedDataType
  meta?: MessageMetaType
}

export type PopupSignCancelledMsgType = {
  type: 'popup/signCancelled'
  payload: SignedDataType
  meta?: MessageMetaType
}

export type PopupInitializedMsgType = {
  type: 'popup/initialized'
  payload: {
    password: string | null
  }
  meta?: MessageMetaType
}

export type PopupMsgTypes =
  | PopupPasswordSetMsgType
  | PopupInitializedMsgType
  | PopupStartedMsgType
  | PopupSignedMsgType
  | PopupSignCancelledMsgType
  | PopupReceiveAccountsMsgType

/* Background message types */
export type BackgroundPasswordSavedMsgType = {
  type: 'background/passwordSaved'
}

// use to transmit password from background to popup
export type BackgroundPasswordMsgType = {
  type: 'background/password'
  payload: { password: string | null }
  meta?: MessageMetaType
}

export type BackgroundSignMsgType = {
  type: 'background/sign'
  payload: ToBeSignDataType
  meta?: MessageMetaType
}
export type BackgroundGetAccountsMsgType = {
  type: 'background/get.accounts'
  payload: ToBeSignDataType
  meta?: MessageMetaType
}

export type BackgroundSignedMsgType = {
  type: 'background/signed'
  payload: SignedDataType
  meta?: MessageMetaType
}

export type BackgroundSyncedMsgType = {
  type: 'background/synced'
  meta?: MessageMetaType
}

export type BackgroundErrorMsgType = {
  type: 'background/error'
  payload: string
  meta?: MessageMetaType
}

export type BackgroundMsgTypes =
  | BackgroundPasswordSavedMsgType
  | BackgroundPasswordMsgType
  | BackgroundSignMsgType
  | BackgroundSignedMsgType
  | BackgroundSyncedMsgType
  | BackgroundErrorMsgType
  | BackgroundGetAccountsMsgType

/* Client message types */

export type ClientSignMsgType = {
  type: 'everisigner/local/sign'
  payload: ToBeSignDataType
  meta?: MessageMetaType
}

export type ClientSupportedActionsMsgType = {
  type: 'everisigner/local/get.supportedactions'
  payload: ToBeSignDataType
  meta?: MessageMetaType
}

export type ClientGetAccountsMsgType = {
  type: 'everisigner/local/get.accounts'
  payload: ToBeSignDataType
  meta?: MessageMetaType
}

export type ClientGlobalSignMsgType = {
  type: 'everisigner/global/sign'
  payload: ToBeSignDataType
}

export type ClientGlobalSignCancelledMsgType = {
  type: 'everisigner/global/signCancelled'
  payload: ToBeSignDataType
}

export type ClientGlobalAccountsMsgType = {
  type: 'everisigner/global/receive.accounts'
  payload: ToBeSignDataType
}

export type ClientGlobalSignedMsgType = {
  type: 'everisigner/global/signed'
  payload: SignedDataType
}

export type ClientGlobalSupportedActionsMsgType = {
  type: 'everisigner/global/receive.supportedactions'
  payload: SignedDataType
}

export type ClientLocalMsgTypes =
  | ClientSignMsgType
  | ClientGetAccountsMsgType
  | ClientSupportedActionsMsgType

export type ClientGlobalMsgTypes =
  | ClientGlobalSignMsgType
  | ClientGlobalSignCancelledMsgType
  | ClientGlobalAccountsMsgType
  | ClientGlobalSignedMsgType
  | ClientGlobalSupportedActionsMsgType

export interface BackgroundMethodsInterface {
  startTimer: (milliseconds: number) => void
}

export type MessageMetaType = {
  tabId: number | null
}

export interface NetworkItemType {
  name: string
  url: string
  isSelected?: boolean
  location: string
  isProduction: boolean
  isCustom: boolean
}

export interface AuthorizedEntity {
  host: string
  authorizedAt: string
}
