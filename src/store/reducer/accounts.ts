import { ACCOUNT_CREATE, StoreActionTypes } from "../action";

type AccountStateType = {
  id: string;
  name: string;
  createdAt: Date;
};

type StateType = AccountStateType[];

export default (state: StateType = [], action: StoreActionTypes): StateType => {
  switch (action.type) {
    case ACCOUNT_CREATE:
      return [...state, action.payload];

    default:
      return state;
  }
};
