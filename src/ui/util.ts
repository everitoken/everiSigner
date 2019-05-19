import { SigningPayloadStateType } from '../store/reducer/signingPayload'
import { get } from 'lodash'
import { NetworkItemType } from '../types'

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
