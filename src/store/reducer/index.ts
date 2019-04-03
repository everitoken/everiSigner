import { combineReducers } from "redux";
import accounts from "./accounts";
import authentication from "./authentication";
import airport from "./airport";
import message from "./message";

const rootReducer = combineReducers({
  airport,
  authentication,
  accounts,
  message
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
