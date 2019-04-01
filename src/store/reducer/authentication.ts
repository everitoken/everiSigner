import { AuthenticationType } from "../../types";
import * as actions from "../action";

type StateType = AuthenticationType;

const defaultState: StateType = {
  status: "uninitialized",
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
        status: "passwordSet",
        password: action.payload
      };

    default:
      return state;
  }
};
