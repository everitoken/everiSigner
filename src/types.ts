export type ActionNameSupportedTypes = 'transferft'
export type ValidAuthenticatedStatusTypes = 'password' | 'hash' | 'unknown'
export type StartScreenNameType = 'GET_STARTED' | 'HOME' | 'LOGIN'

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

export type ClientGlobalSignMsgType = {
  type: 'everisigner/global/sign'
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
  | ClientSupportedActionsMsgType

export type ClientGlobalMsgTypes =
  | ClientGlobalSignMsgType
  | ClientGlobalSignedMsgType
  | ClientGlobalSupportedActionsMsgType

export interface BackgroundMethodsInterface {
  startTimer: (milliseconds: number) => void
}

export type MessageMetaType = {
  tabId: number | null
}
