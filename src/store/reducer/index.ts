import { combineReducers } from "redux";
import accounts from "./accounts";
import authentication from "./authentication";
import airport from "./airport";

const rootReducer = combineReducers({
  airport,
  authentication,
  accounts
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
