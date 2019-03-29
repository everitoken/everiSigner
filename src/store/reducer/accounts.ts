import { AccountType } from "../../types";
import { ACCOUNT_CREATE, ActionTypes } from "../action";

type StateType = AccountType[];

export default (state: StateType = [], action: ActionTypes): StateType => {
  switch (action.type) {
    case ACCOUNT_CREATE:
      return [...state, action.payload];

    default:
      return state;
  }
};
