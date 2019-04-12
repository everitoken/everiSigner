import StoreProvider from './provider'
import { AppState } from './reducer'
import { getPassword, getAccountByPublicKey } from './getter'
import * as fixture from '../fixture'

jest.mock('./getter')

const emptyState: AppState = {
  airport: {},
  authentication: {},
  message: { message: '', variant: 'info', open: false },
  accounts: [],
  signingPayload: { raw: null, signed: null },
}

describe('getPrivateKeyByPublicKey', () => {
  beforeEach(() => {
    getPassword.mockReset()
    getAccountByPublicKey.mockReset()
  })
  it('should error out when there is no password', async () => {
    const storeProvider = new StoreProvider(emptyState)

    getPassword.mockReturnValue(undefined)

    try {
      await storeProvider.getPrivateKeyByPublicKey('dummyPublicKey')
    } catch (error) {
      expect(error).toMatch('Unable to get password')
    }
  })

  it('should get decrypted private key', async () => {
    const account = fixture.accounts.validDefaultEncrypted
    const storeProvider = new StoreProvider(emptyState)
    getPassword.mockReturnValueOnce('ooliufei')
    getAccountByPublicKey.mockReturnValueOnce(account)

    const privateKey = await storeProvider.getPrivateKeyByPublicKey('any key')
    expect(privateKey).toEqual(
      '5JbKK9dsTmCE1HSjAZRXthMZYRrjQa1bG8UJj9bVXP3pY8jQh7F'
    )
  })
})

describe('getAccountByPublicKey', () => {
  beforeEach(() => {
    getAccountByPublicKey.mockReset()
  })

  it('should throw error if account is not found with given public key', async () => {
    const storeProvider = new StoreProvider(emptyState)

    getAccountByPublicKey.mockReturnValueOnce(undefined)
    try {
      await storeProvider.getAccountByPublicKey('any public key')
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toMatch('not found')
    }
  })

  it('should return account if public key is found', async () => {
    const account = fixture.accounts.validDefaultDecrypted
    const newState = {
      ...emptyState,
      accounts: [account],
    }

    const storeProvider = new StoreProvider(newState)

    getAccountByPublicKey.mockReturnValueOnce(account)
    const foundAccount = await storeProvider.getAccountByPublicKey('any key')
    expect(foundAccount).toBe(account)
  })
})
