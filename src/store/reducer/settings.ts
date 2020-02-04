import { LANG_SETTING_SET, StoreActionTypes } from '../action'
import { PURGE } from 'redux-persist'

export type SettingStateType = {
  lang: 'en-US' | 'zh-CN' | null
}

type StateType = SettingStateType

const defaultState: StateType = { lang: null }

export default (
  state: StateType = defaultState,
  action: StoreActionTypes
): StateType => {
  switch (action.type) {
    case LANG_SETTING_SET: {
      return {
        lang: action.payload,
      }
    }

    case PURGE:
      return defaultState
    default:
      return state
  }
}
