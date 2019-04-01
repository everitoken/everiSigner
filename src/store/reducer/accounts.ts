import { AccountType } from "../../types";
import { ACCOUNT_CREATE, StoreActionTypes } from "../action";

type StateType = AccountType[];

export default (state: StateType = [], action: StoreActionTypes): StateType => {
  switch (action.type) {
    case ACCOUNT_CREATE:
      return [...state, action.payload];

    default:
      return state;
  }
};
