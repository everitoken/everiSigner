import { NetworkItemType } from '../../types'
import { StoreActionTypes, NETWORK_SELECT, NETWORK_ADD } from '../action'

const mainnet1 = {
  name: 'mainnet1',
  url: 'https://mainnet1.everitoken.io/',
  abbr: 'HK',
  location: 'Hong Kong',
  isProduction: true,
  isCustom: false,
}

const mainnet2 = {
  name: 'mainnet2',
  url: 'https://mainnet2.everitoken.io/',
  abbr: 'CA',
  location: 'California',
  isProduction: true,
  isCustom: false,
}

const mainnet3 = {
  name: 'mainnet3',
  url: 'https://mainnet3.everitoken.io/',
  abbr: 'TYO',
  location: 'Tokyo',
  isProduction: true,
  isCustom: false,
}

const mainnet4 = {
  name: 'mainnet4',
  url: 'https://mainnet4.everitoken.io/',
  abbr: 'FRA',
  location: 'Frankfurt',
  isProduction: true,
  isCustom: false,
}
const mainnet5 = {
  name: 'mainnet5',
  url: 'https://mainnet5.everitoken.io/',
  abbr: 'SEL',
  location: 'Seoul',
  isProduction: true,
  isCustom: false,
}
const mainnet6 = {
  name: 'mainnet6',
  url: 'https://mainnet6.everitoken.io/',
  abbr: 'BR',
  location: 'Brazil',
  isProduction: true,
  isCustom: false,
}
const mainnet7 = {
  name: 'mainnet7',
  url: 'https://mainnet7.everitoken.io/',
  abbr: 'SG',
  location: 'SINGAPORE',
  isProduction: true,
  isCustom: false,
}

const mainnet8 = {
  name: 'mainnet8',
  url: 'https://mainnet7.everitoken.io/',
  abbr: 'FRA 2',
  location: 'FRANKFURT 2',
  isProduction: true,
  isCustom: false,
}

const mainnet9 = {
  name: 'mainnet9',
  url: 'https://mainnet9.everitoken.io/',
  abbr: 'KL',
  location: 'KUALA LUMPUR',
  isProduction: true,
  isCustom: false,
}
const defaultState = {
  selected: mainnet1,
  networks: [
    mainnet1,
    mainnet2,
    mainnet3,
    mainnet4,
    mainnet5,
    mainnet6,
    mainnet7,
    mainnet8,
    mainnet9,
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
    default:
      return state
  }
}
