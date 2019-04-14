import Evt from './evt'
import StoreProviderInterface from '../store/ProviderInterface'
import StoreProvider from '../store/provider'
import console = require('console')

jest.mock('../store/provider')

test('getName should work', () => {
  const storeProvider: jest.Mocked<StoreProviderInterface> = jest.fn() as any
  const evt = new Evt(storeProvider)
  expect(evt.getName()).toBe('everitoken')
})

test('getVersion', () => {
  const storeProvider: jest.Mocked<StoreProviderInterface> = jest.fn() as any
  const evt = new Evt(storeProvider)
  expect(typeof evt.getVersion()).toBe('string')
})

test('generateSeedPrivateKey', async () => {
  const getSeedMock = jest.fn().mockResolvedValue('seed')
  const storeProvider: jest.Mocked<StoreProviderInterface> = jest.fn() as any
  const evt = new Evt(storeProvider)
  const privateKey = await evt.generateSeedPrivateKey(getSeedMock)
  expect(privateKey).toEqual(
    '5J1by7KRQujRdXrurEsvEr2zQGcdPaMJRjewER6XsAR2eCcpt3D'
  )
})

test('signHash', async () => {
  const getPrivateKey = jest
    .fn()
    .mockResolvedValue('5J1by7KRQujRdXrurEsvEr2zQGcdPaMJRjewER6XsAR2eCcpt3D')
  const storeProvider: jest.Mocked<StoreProviderInterface> = jest.fn() as any
  const evt = new Evt(storeProvider)
  const signature = await evt.signHash(
    new Buffer(
      '936a185caaa266bb9cbe981e9e05cb78cd732b0b3280eb944412bb6f8f8f07af',
      'hex'
    ),
    getPrivateKey
  )
  expect(signature).toEqual(
    'SIG_K1_KBBaFykAbdwEJrAJUGNjMTuREkigGyRPachXjE3mAE8qTj2xJofiQu1Mu2FkCyrbWNo3AKhcyAYG1niA2fd82epqocoDz5'
  )
})

test('sign', async () => {
  const getPrivateKey = jest
    .fn()
    .mockResolvedValue('5J1by7KRQujRdXrurEsvEr2zQGcdPaMJRjewER6XsAR2eCcpt3D')
  const storeProvider: jest.Mocked<StoreProviderInterface> = jest.fn() as any
  const evt = new Evt(storeProvider)
  const signature = await evt.sign('helloworld', getPrivateKey)
  expect(signature).toEqual(
    'SIG_K1_KBBaFykAbdwEJrAJUGNjMTuREkigGyRPachXjE3mAE8qTj2xJofiQu1Mu2FkCyrbWNo3AKhcyAYG1niA2fd82epqocoDz5'
  )
})
