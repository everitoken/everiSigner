import * as storeActions from "../action";
import * as uiActions from "../../ui/action";
import { take, fork, call, put } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import * as PasswordService from "../../service/PasswordService";
import { Portal } from "@material-ui/core";
import { BgMsgResponseTypes } from "../../types";

let backgroundPort = null;

/**
 * Block on background message to be able to program in a sync style
 * 
 * Usage:
    console.log("before take");
    const action = yield call(
      waitBackgroundResponse,
      "background/passwordSaved"
    );
    console.log("release take", JSON.stringify(action, null, 4));
 */
function* waitBackgroundResponse(type: string) {
  const action: uiActions.BackgroundReceiveMessageType = yield take(
    (a: any) =>
      a.type === uiActions.RECEIVE_BACKGROUND_MESSAGE && a.payload.type === type
  );
  return action;
}
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
    backgroundPort.postMessage({
      type: "popup/passwordReceive",
      payload: uiAction.payload
    });
  }
}

function* backgroundChannelHandler(port: chrome.runtime.Port) {
  const chan = yield call(setupMessagingChannel, port);

  try {
    while (true) {
      let message: BgMsgResponseTypes = yield take(chan);

      // convert to redux action, so other watchers can "take" on
      yield put(uiActions.receiveBackgroundMessage(message));
    }
  } finally {
  }
}

function* setupMessagingChannel(port: chrome.runtime.Port) {
  return eventChannel(emitter => {
    port.onMessage.addListener(emitter);

    port.onDisconnect.addListener(() => {
      emitter(END);
    });

    return () => {
      port.disconnect();
      backgroundPort = null;
    };
  });
}

function* rootSaga() {
  if (backgroundPort === null) {
    backgroundPort = chrome.runtime.connect({ name: "background" });
    backgroundPort.postMessage({ type: "popup/initialized" });
  }

  yield fork(backgroundChannelHandler, backgroundPort);
  yield fork(createAccountHandler);
  yield fork(setPasswordHandler);
}

export default rootSaga;
