import * as Evtjs from 'evtjs'
import ChainInterface from './ChainInterface'
import StoreProviderInterface from '../store/ProviderInterface'

class Evt implements ChainInterface {
  storeProvider: StoreProviderInterface
  constructor(storeProvider: StoreProviderInterface) {
    // console.log(storeProvider.getAccountByPublicKey)
    this.storeProvider = storeProvider
  }
  getName = () => 'everitoken'
  getVersion = () => Evtjs.version

  generateSeedPrivateKey = async (
    getSeed: (provider: StoreProviderInterface) => Promise<string>
  ) => {
    const { EvtKey } = Evtjs
    const seed = await getSeed(this.storeProvider)
    return EvtKey.seedPrivateKey(seed)
  }
  getPublicKeyFromPrivateKey = async (publicKey: string) =>
    this.storeProvider.getPrivateKeyByPublicKey(publicKey)

  randomPrivateKey = async () => Evtjs.EvtKey.randomPrivateKey()

  signHash = async (
    hash: Buffer,
    getPrivateKey: (provider: StoreProviderInterface) => Promise<string>
  ) => {
    const privateKey = await getPrivateKey(this.storeProvider)
    return Evtjs.EvtKey.signHash(hash, privateKey)
  }
  sign = async (
    data: string,
    getPrivateKey: (provider: StoreProviderInterface) => Promise<string>
  ) => {
    const privateKey = await getPrivateKey(this.storeProvider)
    return Evtjs.EvtKey.sign(data, privateKey)
  }
}

export default Evt
