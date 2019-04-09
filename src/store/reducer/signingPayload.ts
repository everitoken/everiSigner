import * as actions from '../action'
import { PURGE } from 'redux-persist/es/constants'
import { ToBeSignDataType, SignedDataType, MessageMetaType } from '../../types'

export type SigningPayloadStateType = {
  raw: { payload: ToBeSignDataType; meta?: MessageMetaType } | null
  signed: SignedDataType | null
}

type StateType = SigningPayloadStateType

const defaultState: StateType = {
  raw: null,
  signed: null,
}

export default (
  state: StateType = defaultState,
  action: actions.StoreActionTypes
): StateType => {
  switch (action.type) {
    case actions.SIGNING_PAYLOAD_RECEIVE:
      return {
        ...state,
        raw: { payload: action.payload, meta: action.meta },
      }
    case actions.SIGNED_PAYLOAD_RECEIVE:
      return {
        ...state,
        signed: action.payload,
      }

    case PURGE:
      return defaultState

    default:
      return state
  }
}
