import * as actions from "../action";

type AuthenticationStateType = {
  password?: string;
};

type StateType = AuthenticationStateType;

const defaultState: StateType = {
  password: null
};

export default (
  state: StateType = defaultState,
  action: actions.StoreActionTypes
): StateType => {
  switch (action.type) {
    case actions.PASSWORD_SET:
      return {
        ...state,
        password: action.payload
      };
    case actions.PASSWORD_REMOVE:
      return defaultState;
    default:
      return state;
  }
};
