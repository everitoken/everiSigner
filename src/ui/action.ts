import { ToBeSignDataType, BackgroundMsgTypes, MessageMetaType } from '../types'
import { AccountStateType } from '../store/reducer/accounts'

export const SET_PASSWORD = 'ui/SET_PASSWORD'
export const REMOVE_PASSWORD = 'ui/REMOVE_PASSWORD'
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
export const IMPORT_WALLET = 'ui/IMPORT_WALLET'
export const FETCH_OWNED_TOKENS = 'ui/FETCH_OWNED_TOKENS'
export const AUTHORIZE_ENTITY = 'ui/AUTHORIZE_ENTITY'
export const TRANSFER_FT = 'ui/TRANSFER_FT'
export const TRANSFER_FT_ACKNOWLEDGE = 'ui/TRANSFER_FT_ACKNOWLEDGE'

export const sign = (
  payload: {
    payload: ToBeSignDataType
    meta?: MessageMetaType
  },
  publicKey: string,
  cancel = false
) => ({
  type: SIGN,
  payload,
  meta: { publicKey, cancel },
})

export const setPassword = (password: string) => ({
  type: SET_PASSWORD,
  payload: password,
})

export const removePassword = () => ({
  type: REMOVE_PASSWORD,
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
  isDefaultAccount = false
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

export const fetchBalance = (publicKey: string, scope = 'default') => ({
  type: FETCH_BALANCE,
  payload: {
    publicKey,
    scope,
  },
})

export const exportWallet = (payload: {
  walletPassword: string
  backupPassword: string
}) => ({
  type: EXPORT_WALLET,
  payload,
})

export const importWallet = (wallet: string) => ({
  type: IMPORT_WALLET,
  wallet,
})

export const setMainAccount = (account: AccountStateType) => ({
  type: SET_MAIN_ACCOUNT,
  payload: { account },
})

export const removeAccount = (account: AccountStateType) => ({
  type: REMOVE_ACCOUNT,
  payload: { account },
})

export const fetchOwnedTokens = (publicKeys: string[]) => ({
  type: FETCH_OWNED_TOKENS,
  payload: {
    publicKeys,
  },
})

interface TransferFtPayload {
  from: string
  to: string
  number: string
  memo: string
}
export const transferft = (payload: TransferFtPayload, id: string) => ({
  type: TRANSFER_FT,
  payload,
  meta: { id },
})

export const transferftAcknowledge = (id: string) => ({
  type: TRANSFER_FT_ACKNOWLEDGE,
  payload: { id },
})
