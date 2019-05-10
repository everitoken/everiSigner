import { AppState } from './reducer'
import { StartScreenNameType, ValidAuthenticatedStatusTypes } from '../types'
import { get } from 'lodash'
import { decryptAccount } from '../service/PasswordService'
import { AccountStateType } from './reducer/accounts'
import { isArray } from 'lodash'
import * as PasswordService from '../service/PasswordService'

export const getDefaultAccount = (state: AppState) =>
  state.accounts.find(account => account.type === 'default')

export const getAccountByPublicKey = (
  state: AppState,
  ownProps: { publicKey: string }
) => state.accounts.find(account => account.publicKey === ownProps.publicKey)

export const getAccountById = (state: AppState, ownProps: { id: string }) =>
  state.accounts.find(account => account.id === ownProps.id)

export const getPasswordHash = (state: AppState) =>
  state.authentication.password

export const getPassword = (state: AppState): string | false =>
  get(state, 'airport.password', false)

export const getUiReadyStatus = (state: AppState): boolean =>
  get(state, 'airport.uiready', false)

export const getAuthenticateAccountRequest = (
  state: AppState
): { request: {} | null; accounts: AccountStateType[] } => ({
  request: get(state, 'airport.get/accounts', null),
  accounts: state.accounts,
})

export const getAuthenticatedStatus = (
  state: AppState
): ValidAuthenticatedStatusTypes => {
  const password = getPassword(state)

  if (password) {
    return 'password'
  }

  const passwordHash = state.authentication.password

  if (passwordHash) {
    return 'hash'
  }

  return 'unknown'
}

/**
 * If there is a temp password, app is active
 * If there is only a password hash, app is locked
 * If there is neither password nor hash, app should be initialized
 */
export const getStartScreenName = (
  state: AppState
): { name: StartScreenNameType } => {
  const authStatus = getAuthenticatedStatus(state)

  if (authStatus === 'password') {
    return { name: 'HOME' }
  }

  if (authStatus === 'hash') {
    return { name: 'LOGIN' }
  }

  return { name: 'GET_STARTED' }
}

export const mapInputPassword = (state: AppState) => ({
  passwordHash: getPasswordHash(state),
})

export const getSnackbarMessage = ({ message }: AppState) => message

export const getAccountImportScreen = (state: AppState) => ({
  accountNames: state.accounts.map(({ name }) => name),
})

export const getDefaultAccountDecrypted = (state: AppState) => {
  const account = state.accounts.find(account => account.type === 'default')
  const accountNames = state.accounts.map(({ name }) => name)
  const password = getPassword(state)

  let words = ''

  if (password) {
    words = PasswordService.generateMnemonicWords(password, 'english')
  }

  if (!account || !password) {
    return { account: null, words, accountName: accountNames }
  }

  return { account: decryptAccount(password, account), words, accountNames }
}

export const getSigningPayload = ({ signingPayload }: AppState) => ({
  signingPayload,
})

export const getBalanceByPublicKey = (
  state: AppState,
  ownProps: { publicKey: string }
) => {
  const balances = get(state, `airport.balance/${ownProps.publicKey}`)
  return {
    balances: balances || [],
    fetched: isArray(balances),
  }
}

export const getNetworks = (state: AppState) => state.network
