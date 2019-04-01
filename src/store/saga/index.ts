import * as storeActions from "../action";
import * as uiActions from "../../ui/action";
import { take, fork, call, put } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import * as PasswordService from "../../service/PasswordService";
import { Portal } from "@material-ui/core";

function* createAccountHandler() {
  while (true) {
    const action = yield take(storeActions.ACCOUNT_CREATE);
    console.log("saga", action);
  }
}

function* setPasswordHandler() {
  while (true) {
    const uiAction: uiActions.SetPasswordType = yield take(
      uiActions.SET_PASSWORD
    );

    // hash password with bcrypt
    const hash = PasswordService.hashPassword(uiAction.payload);

    // store hash in store and store "passwordset" in store
    yield put(storeActions.passwordSet(hash));

    // send password to background.js
    console.log(uiAction);
  }
}

function* backgroundChannelHandler(port: chrome.runtime.Port) {
  const chan = yield call(setupMessagingChannel, port);

  try {
    while (true) {
      let message = yield take(chan);

      console.log(message);
    }
  } finally {
  }
}

function* setupMessagingChannel(port: chrome.runtime.Port) {
  return eventChannel(emitter => {
    port.onMessage.addListener(msg => {
      emitter(uiActions.receiveBackgroundMessage(msg));
    });

    port.onDisconnect.addListener(() => {
      emitter(END);
    });

    return () => {
      port.disconnect();
    };
  });
}

function* rootSaga() {
  const backgroundPort = chrome.runtime.connect({ name: "background" });
  backgroundPort.postMessage({ payload: "popup.initialized" });

  yield fork(backgroundChannelHandler, backgroundPort);
  yield fork(createAccountHandler);
  yield fork(setPasswordHandler);
}

export default rootSaga;
