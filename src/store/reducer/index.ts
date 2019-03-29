import { combineReducers } from "redux";
import accounts from "./accounts";

const rootReducer = combineReducers({
  accounts
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
