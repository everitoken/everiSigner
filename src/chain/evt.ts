import * as Evtjs from 'evtjs'
import ChainInterface from './ChainInterface'
import StoreProviderInterface from '../store/ProviderInterface'

class Evt implements ChainInterface {
  storeProvider: StoreProviderInterface
  network: {}
  constructor(storeProvider: StoreProviderInterface, network: {}) {
    this.storeProvider = storeProvider
    this.network = network
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
  getPublicKeyFromPrivateKey = async (privateKey: string) => {
    const { EvtKey } = Evtjs
    return EvtKey.privateToPublic(privateKey)
  }

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

  getBalancesByPublicKey = async (publicKey: string) => {
    const apiCaller = new Evtjs.default({
      endpoint: this.network,
    })

    return apiCaller.getFungibleBalance(publicKey)
  }

  getOwnedTokens = async (publicKeys: string[]) => {
    const apiCaller = new Evtjs.default({
      endpoint: this.network,
    })

    return apiCaller.getOwnedTokens(publicKeys)
  }

  getFungibleDetail = async (id: number) => {
    const apiCaller = new Evtjs.default({
      endpoint: this.network,
    })

    return apiCaller.getFungibleSymbolDetail(id)
  }
  setNetwork = (network: {}) => {
    this.network = network
  }
}

export default Evt
