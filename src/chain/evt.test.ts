import Evt from './evt'
import StoreProviderInterface from '../store/ProviderInterface'

test('getName should work', () => {
  const storeProvider: jest.Mocked<StoreProviderInterface> = jest.fn() as any
  const evt = new Evt(storeProvider)
  expect(evt.getName()).toBe('everitoken')
})
