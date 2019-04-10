import { SigningPayloadStateType } from '../store/reducer/signingPayload'
import { get } from 'lodash'

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
