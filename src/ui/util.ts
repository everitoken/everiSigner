import { SigningPayloadStateType } from '../store/reducer/signingPayload'
import { get } from 'lodash'
import { NetworkItemType, TokenDetail } from '../types'
import { imageDataUriMap } from '../asset'

export const getDisplayableSigningPayload: any = (
  payload: SigningPayloadStateType
) => {
  const data = get(payload, 'raw.payload.data', null)

  try {
    return JSON.parse(data)
  } catch (e) {
    return {}
  }
}

export const isSameNetwork = (
  network1: NetworkItemType,
  network2: NetworkItemType
) => network1.url === network2.url

export const shortenAddress = (address: string) =>
  `${address.slice(0, 7)}...${address.slice(-7)}`

export const getEmptyEvtBalance = (): TokenDetail => {
  return {
    id: 1,
    displayName: 'EVT',
    precision: 5,
    name: 'EVT',
    logoDataUri: imageDataUriMap['1.transparent'],
    value: '0.00000',
  }
}

export const getEvtEndpoint = (network: NetworkItemType) => ({
  host: network.url
    .replace(/\/$/, '')
    .replace(/^https:\/\//, '')
    .replace(/^http:\/\//, ''),
  port: network.url.startsWith('https') ? 443 : 80,
  protocol: network.url.startsWith('https') ? 'https' : 'http',
})
