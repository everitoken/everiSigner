import * as React from 'react'
import { noop } from 'lodash'
import { NetworkItemType } from '../types'
import { useLocalStorageState } from 'react-storage-hooks'

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

const { createContext, useState } = React
const NETWORKS = [
  testnet,
  mainnet1,
  mainnet2,
  mainnet3,
  mainnet4,
  mainnet5,
  mainnet6,
  mainnet7,
  mainnet8,
  mainnet9,
  mainnet14,
]

const defaultnetwork = mainnet1
export const NetworkContext = createContext({
  networks: NETWORKS,
  selected: defaultnetwork,
  selectNetwork: noop,
  addNetwork: noop,
  removeNetwork: noop,
})

let selectedNetworkCached: NetworkItemType = defaultnetwork

type PropTypes = {
  children: React.ReactNode
}

export default function NetworkContextProvider(props: PropTypes) {
  const [networksInStorage, setNetworksInStorage] = useLocalStorageState(
    'networks',
    NETWORKS
  )
  const [selectedNetorkInStorage, setSelectedInStorage] = useLocalStorageState(
    'network.selected',
    mainnet1
  )
  const [networks, setNetworksLocal] = useState(networksInStorage)
  const [selected, setSelectedLocal] = useState(selectedNetorkInStorage)
  selectedNetworkCached = selected

  const addNetwork = (network: NetworkItemType) => {
    const hasNetwork = networks.find(n => n.url === network.url)

    if (hasNetwork) {
      return
    }

    const newNetworks = [...networks, network]
    setNetworksLocal(newNetworks)
    setNetworksInStorage(newNetworks)
  }

  const removeNetwork = (network: NetworkItemType) => {
    const newNetworks = networks.filter(n => n.url !== network.url)
    if (network.url === selected.url) {
      setSelectedLocal(newNetworks[0])
      selectedNetworkCached = newNetworks[0]
      setSelectedInStorage(network)
    }

    setNetworksLocal(newNetworks)
    setNetworksInStorage(newNetworks)
  }

  const selectNetwork = (network: NetworkItemType) => {
    setSelectedLocal(network)
    selectedNetworkCached = network
    setSelectedInStorage(network)
  }

  return (
    <NetworkContext.Provider
      value={{
        networks,
        selected,
        selectNetwork,
        addNetwork,
        removeNetwork,
      }}
    >
      {props.children}
    </NetworkContext.Provider>
  )
}

// TODO: Think of refactoring
export const getSelectedNetwork = () => {
  return selectedNetworkCached
}
