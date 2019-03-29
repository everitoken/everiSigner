import * as actions from "../action";
import { take, fork } from "redux-saga/effects";

function* createAccountHandler() {
  while (true) {
    const action = yield take(actions.ACCOUNT_CREATE);
    console.log("saga", action);
  }
}

function* rootSaga() {
  yield fork(createAccountHandler);
}

export default rootSaga;
