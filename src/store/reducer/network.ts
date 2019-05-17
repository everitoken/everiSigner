import { NetworkItemType } from '../../types'
import {
  StoreActionTypes,
  NETWORK_SELECT,
  NETWORK_ADD,
  NETWORK_REMOVE,
} from '../action'

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

const defaultState = {
  selected: mainnet1,
  networks: [
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
  ],
}

export type NetworkStateType = {
  selected: NetworkItemType
  networks: NetworkItemType[]
}

export default (
  state: NetworkStateType = defaultState,
  action: StoreActionTypes
) => {
  switch (action.type) {
    case NETWORK_SELECT:
      return {
        ...state,
        selected: action.payload.network,
      }

    case NETWORK_ADD:
      const hasNetwork = state.networks.find(
        network => network.url === action.payload.network.url
      )

      if (hasNetwork) {
        return state
      }

      return {
        ...state,
        networks: [...state.networks, action.payload.network],
      }
    case NETWORK_REMOVE:
      return {
        ...state,
        selected:
          state.selected.url === action.payload.network.url
            ? state.networks[0]
            : state.selected,
        networks: state.networks.filter(
          network => network.url !== action.payload.network.url
        ),
      }
    default:
      return state
  }
}
