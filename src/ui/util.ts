import { SigningPayloadStateType } from '../store/reducer/signingPayload'
import { get } from 'lodash'
import { SignedDataType } from '../types';

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

// export const getDisplayableSignedPayload = (payload: SignedDataType) => {
//   const data = get(payload, 'signature', null)
//     try {

//     }
// }