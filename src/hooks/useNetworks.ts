import * as React from 'react'
import { NetworkItemType } from '../types'
import createPersistedState from 'use-persisted-state'
const useNetworkState = createPersistedState('networks')

const mainnet1 = {
  name: 'mainnet1',
  url: 'https://mainnet1.everitoken.io',
  location: 'Hong Kong',
  isProduction: true,
  isCustom: false,
}

const mainnet2 = {
  name: 'mainnet2',
  url: 'https://mainnet2.everitoken.io',
  location: 'California',
  isProduction: true,
  isCustom: false,
}

const mainnet3 = {
  name: 'mainnet3',
  url: 'https://mainnet3.everitoken.io',
  location: 'Tokyo',
  isProduction: true,
  isCustom: false,
}

const mainnet4 = {
  name: 'mainnet4',
  url: 'https://mainnet4.everitoken.io',
  location: 'Frankfurt',
  isProduction: true,
  isCustom: false,
}
const mainnet5 = {
  name: 'mainnet5',
  url: 'https://mainnet5.everitoken.io',
  location: 'Seoul',
  isProduction: true,
  isCustom: false,
}
const mainnet6 = {
  name: 'mainnet6',
  url: 'https://mainnet6.everitoken.io',
  location: 'Brazil',
  isProduction: true,
  isCustom: false,
}
const mainnet7 = {
  name: 'mainnet7',
  url: 'https://mainnet7.everitoken.io',
  location: 'SINGAPORE',
  isProduction: true,
  isCustom: false,
}

const mainnet8 = {
  name: 'mainnet8',
  url: 'https://mainnet7.everitoken.io',
  location: 'FRANKFURT 2',
  isProduction: true,
  isCustom: false,
}

const mainnet9 = {
  name: 'mainnet9',
  url: 'https://mainnet9.everitoken.io',
  location: 'KUALA LUMPUR',
  isProduction: true,
  isCustom: false,
}
const mainnet14 = {
  name: 'mainnet14',
  url: 'https://mainnet14.everitoken.io',
  location: 'SHANG HAI',
  isProduction: true,
  isCustom: false,
}

const testnet = {
  name: 'testnet',
  url: 'https://testnet1.everitoken.io',
  location: 'Test Net',
  isProduction: true,
  isCustom: false,
}

export const NETWORKS = [
  mainnet1,
  mainnet3,
  mainnet2,
  mainnet4,
  mainnet5,
  mainnet6,
  mainnet7,
  mainnet8,
  mainnet9,
  mainnet14,
  testnet,
]

export const DEFAULT_NETWORK = mainnet1

type NetworkOperation = (network: NetworkItemType) => void
type SelectNetork = () => NetworkItemType

function useNetwork(
  initialNetworks: NetworkItemType[]
): [
  Array<NetworkItemType>,
  SelectNetork,
  NetworkOperation,
  NetworkOperation,
  NetworkOperation
] {
  const [networks, setNetworks]: [
    NetworkItemType[],
    (networks: NetworkItemType[]) => void
  ] = useNetworkState(initialNetworks)

  const addNetwork = (network: NetworkItemType) => {
    const hasNetwork = networks.find(n => n.url === network.url)

    if (hasNetwork) {
      return
    }

    const newNetworks = [...networks, network]
    setNetworks(newNetworks)
  }

  const removeNetwork = (network: NetworkItemType) => {
    const newNetworks = networks.filter(n => n.url !== network.url)
    const selected = getSelected()
    if (network.url === selected.url) {
      selectNetwork(newNetworks[0])
    }

    setNetworks(newNetworks)
  }

  const selectNetwork = (network: NetworkItemType) => {
    const newNetworks = networks.map(n => {
      if (n.url === network.url) {
        return { ...n, isSelected: true }
      }
      return { ...n, isSelected: false }
    })
    setNetworks(newNetworks)
  }

  const getSelected = () => {
    const hasSelected = networks.find(n => !!n.isSelected)
    if (!hasSelected) {
      selectNetwork(DEFAULT_NETWORK)
    }
    return networks.find(n => !!n.isSelected) as NetworkItemType
  }

  return [networks, getSelected, selectNetwork, addNetwork, removeNetwork]
}

export default useNetwork
