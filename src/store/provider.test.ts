import storeProvider from './provider'
import { AppState } from './reducer'
import { getPassword, getAccountByPublicKey, getDefaultAccount } from './getter'
import { accounts } from '../fixture'
import * as fixture from '../fixture'

const emptyState: AppState = {
  airport: {},
  authentication: {},
  message: { message: '', variant: 'info', open: false },
  accounts: [],
  signingPayload: { raw: null, signed: null },
}

describe('getPrivateKeyByPublicKey', () => {
  it('should error out when there is no password', async () => {
    const getStateMocked = jest.fn()
    storeProvider.init({ getState: getStateMocked })

    getStateMocked.mockReturnValueOnce({})

    try {
      await storeProvider.get().getPrivateKeyByPublicKey('dummyPublicKey')
    } catch (error) {
      expect(error).toMatch('Unable to get password')
    }
  })

  it('should get decrypted private key', async () => {
    const account = fixture.accounts.validDefaultEncrypted
    const getStateMocked = jest.fn()
    storeProvider.init({ getState: getStateMocked })

    getStateMocked.mockReturnValue({
      airport: {
        password: 'ooliufei',
      },
      accounts: [account],
    })

    const privateKey = await storeProvider
      .get()
      .getPrivateKeyByPublicKey(account.publicKey)
    expect(privateKey).toEqual(
      '5JbKK9dsTmCE1HSjAZRXthMZYRrjQa1bG8UJj9bVXP3pY8jQh7F'
    )
  })
})

describe('getAccountByPublicKey', () => {
  it('should throw error if account is not found with given public key', async () => {
    const getStateMocked = jest.fn()
    storeProvider.init({ getState: getStateMocked })

    getStateMocked.mockReturnValue({
      accounts: [],
      airport: { password: 'ooliufei' },
    })
    try {
      await storeProvider.get().getAccountByPublicKey('any public key')
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toMatch('not found')
    }
  })

  it('should return account if public key is found', async () => {
    const account = fixture.accounts.validDefaultEncrypted
    const newState = {
      ...emptyState,
      airport: {
        password: 'ooliufei',
      },
      accounts: [account],
    }
    const getStateMocked = jest.fn()
    storeProvider.init({ getState: getStateMocked })

    getStateMocked.mockReturnValue(newState)

    const foundAccount = await storeProvider
      .get()
      .getAccountByPublicKey(account.publicKey)
    expect(foundAccount.id).toBe(account.id)
  })
})

describe('getDefaultAccount', () => {
  it('should throw error if default account is not found', async () => {
    const newState = {
      ...emptyState,
      accounts: [],
    }
    const getStateMocked = jest.fn()
    storeProvider.init({ getState: getStateMocked })

    getStateMocked.mockReturnValue(newState)
    try {
      await storeProvider.get().getDefaultAccount()
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toMatch('not found')
    }
  })

  it('should return default account', async () => {
    const account = fixture.accounts.validDefaultEncrypted
    const newState = {
      ...emptyState,
      airport: {
        password: 'ooliufei',
      },
      accounts: [account],
    }
    const getStateMocked = jest.fn()
    storeProvider.init({ getState: getStateMocked })

    getStateMocked.mockReturnValue(newState)

    const foundAccount = await storeProvider.get().getDefaultAccount()
    expect(foundAccount.id).toBe(account.id)
  })
})
