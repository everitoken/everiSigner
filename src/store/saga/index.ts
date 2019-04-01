import * as storeActions from "../action";
import * as uiActions from "../../ui/action";
import { take, fork } from "redux-saga/effects";

function* createAccountHandler() {
  while (true) {
    const action = yield take(storeActions.ACCOUNT_CREATE);
    console.log("saga", action);
  }
}

function* setPasswordHandler() {
  while (true) {
    const uiAction = yield take(uiActions.SET_PASSWORD);
    // hash password with bcrypt
    // store hash in store
    // store "passwordset" in store
    // send password to background.js
    console.log(uiAction);
  }
}

function* rootSaga() {
  yield fork(createAccountHandler);
  yield fork(setPasswordHandler);
}

export default rootSaga;
