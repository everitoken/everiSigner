import {
  ToBeSignDataType,
  BackgroundMsgTypes,
  MessageMetaType,
  NetworkItemType,
} from '../types'
import { AccountStateType } from '../store/reducer/accounts'

export const SET_PASSWORD = 'ui/SET_PASSWORD'
export const LOG_IN = 'ui/LOG_IN'
export const RECEIVE_BACKGROUND_MESSAGE = 'background/RECEIVE_MESSAGE'
export const CREATE_MNEMONIC_ACCOUNT = 'ui/CREATE_MNEMONIC_ACCOUNT'
export const IMPORT_ACCOUNT = 'ui/IMPORT_ACCOUNT'
export const SIGN = 'ui/SIGN'
export const AUTHORIZE_ACCOUNT_ACCESS = 'ui/AUTHORIZE_ACCOUNT_ACCESS'
export const FETCH_BALANCE = 'ui/FETCH_BALANCE'
export const COPY_TO_CLIPBOARD = 'ui/COPY_ADDRESS'

export const SET_MAIN_ACCOUNT = 'ui/SET_MAIN_ACCOUNT'
export const REMOVE_ACCOUNT = 'ui/REMOVE_ACCOUNT'
export const ADD_CUSTOM_NETWORK = 'ui/ADD_CUSTOM_NETWORK'
export const REMOVE_CUSTOM_NETWORK = 'ui/REMOVE_CUSTOM_NETWORK'
export const EXPORT_WALLET = 'ui/EXPORT_WALLET'

export const sign = (
  payload: {
    payload: ToBeSignDataType
    meta?: MessageMetaType
  },
  publicKey: string
) => ({
  type: SIGN,
  payload,
  meta: { publicKey },
})

export const setPassword = (password: string) => ({
  type: SET_PASSWORD,
  payload: password,
})

export const logIn = (password: string) => ({
  type: LOG_IN,
  payload: password,
})

export const importAccount = (payload: {
  privateKey: string
  name: string
  id: string
}) => ({
  type: IMPORT_ACCOUNT,
  payload,
})

export const createAccountWithMnemonic = (
  payload: {
    id: string
    name: string
    words: string
  },
  isDefaultAccount: boolean = false
) => ({
  type: CREATE_MNEMONIC_ACCOUNT,
  payload,
  meta: { isDefault: isDefaultAccount },
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

export const copyToClipboard = (payload: string) => ({
  type: COPY_TO_CLIPBOARD,
  payload,
})
export const exportWallet = () => ({
  type: EXPORT_WALLET,
})

export const setMainAccount = (account: AccountStateType) => ({
  type: SET_MAIN_ACCOUNT,
  payload: { account },
})

export const removeAccount = (account: AccountStateType) => ({
  type: REMOVE_ACCOUNT,
  payload: { account },
})

export const addCustomNetwork = (network: NetworkItemType) => ({
  type: ADD_CUSTOM_NETWORK,
  payload: { network },
})

export const removeNetwork = (network: NetworkItemType) => ({
  type: REMOVE_CUSTOM_NETWORK,
  payload: { network },
})
