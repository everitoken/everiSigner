import { AppState } from './reducer'
import {
  StartScreenNameType,
  ValidAuthenticatedStatusTypes,
  AuthorizedEntity,
} from '../types'
import { get } from 'lodash'
import { AccountStateType } from './reducer/accounts'
import * as PasswordService from '../service/PasswordService'
import { RouteComponentProps } from 'react-router-dom'

export const getDefaultAccount = (state: AppState) =>
  state.accounts.find(account => account.type === 'seed')

export const getForHome = (state: AppState) => ({
  mainAccount: state.accounts.find(({ isMain }) => isMain),
  accounts: state.accounts,
})

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
): {
  request: {} | null
  accounts: AccountStateType[]
  authorizedEntities: AuthorizedEntity[]
} => ({
  request: get(state, 'airport.get/accounts', null),
  accounts: state.accounts,
  authorizedEntities: state.authorizedEntities,
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

export const getAccountImportScreen = (state: AppState) => ({
  accountNames: state.accounts.map(({ name }) => name),
  publicKeys: state.accounts.map(({ publicKey }) => publicKey),
})

export const getDecryptedAccounts = (state: AppState) => {
  const password = getPassword(state)
  if (!password) {
    return { accounts: [] }
  }

  return {
    accounts: state.accounts.map(account =>
      PasswordService.decryptAccount(password, account)
    ),
  }
}

export const getSeedAccountDecrypted = (state: AppState) => {
  const account = state.accounts.find(account => account.type === 'seed')
  const accountNames = state.accounts.map(({ name }) => name)
  const password = getPassword(state)

  let words = ''

  if (password) {
    words = PasswordService.generateMnemonicWords(password, 'english')
  }

  if (!account || !password) {
    return { account: null, words, accountNames }
  }

  return {
    account: PasswordService.decryptAccount(password, account),
    words,
    accountNames,
  }
}

export const getSigningPayload = ({ signingPayload, accounts }: AppState) => ({
  signingPayload,
  accounts,
  mainAccount: accounts.find(({ isMain }) => isMain) as AccountStateType,
})

const emptyArray: any[] = []

export const getBalanceByPublicKey = (
  state: AppState,
  ownProps: { publicKey: string }
) => {
  const balances = get(state, `airport.balance/default/${ownProps.publicKey}`)
  const fetching = get(state, 'airport.balance/default/fetching', false)

  return {
    balances: balances || emptyArray,
    fetching,
  }
}

export const getOwnedTokensByPublicKey = (
  state: AppState,
  ownProps: { publicKey: string }
) => {
  const ownedTokens = get(state, `airport.ownedTokens/${ownProps.publicKey}`)
  const fetching = get(state, 'airport.ownedTokens/fetching', false)

  return {
    data: ownedTokens || [],
    fetching,
  }
}

export const getAccountDetailScreen = (
  state: AppState,
  ownProps: RouteComponentProps<{ id: string }>
) => {
  const id = ownProps.match.params.id
  return {
    account: getAccountById(state, { id }),
  }
}

export const getPasswordProtectedView = (
  state: AppState,
  ownProps: RouteComponentProps<{ id: string }>
) => ({
  password: get(state, 'airport.password', ''),
  account: getAccountById(state, { id: ownProps.match.params.id }),
})

export const getMainAccount = (state: AppState) => ({
  account: state.accounts.find(({ isMain }) => isMain) as AccountStateType,
})

export const getDecryptedMainAccount = (state: AppState) => {
  const password = getPassword(state)
  if (!password) {
    return { account: null }
  }

  return {
    account: PasswordService.decryptAccount(
      password,
      state.accounts.find(({ isMain }) => isMain) as AccountStateType
    ),
  }
}

export const getForTransferFungible = (
  state: AppState
): { transactions: any[]; account: AccountStateType } => {
  return {
    transactions: get(state.airport, 'transactions', []) as any[],
    ...getMainAccount(state),
  }
}

export const getForTokenSelect = (scope: string) => (state: AppState) => {
  const publicKey = getMainAccount(state).account.publicKey
  const balances = get(state, `airport.balance/${scope}/${publicKey}`, [])
  const fetching = get(state, `airport.balance/${scope}/fetching`, false)

  return {
    publicKey,
    balances,
    fetching,
  }
}

export const getLang = (state: AppState) => ({
  lang: state.settings.lang || navigator.language,
})
