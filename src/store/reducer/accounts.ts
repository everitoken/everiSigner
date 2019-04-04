import { ACCOUNT_CREATE, StoreActionTypes } from "../action";
import { PURGE } from "redux-persist";

export type AccountStateType = {
  type: "default" | "imported";
  words: string;
  privateKey: string;
  id: string;
  name: string;
  createdAt: Date;
};

type StateType = AccountStateType[];

const defaultState = [];

export default (
  state: StateType = defaultState,
  action: StoreActionTypes
): StateType => {
  switch (action.type) {
    case ACCOUNT_CREATE:
      return [...state, action.payload];

    case PURGE:
      return defaultState;
    default:
      return state;
  }
};
