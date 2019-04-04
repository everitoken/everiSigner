import * as storeActions from "../action";
import * as uiActions from "../../ui/action";
import { select, take, fork, call, put } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import * as PasswordService from "../../service/PasswordService";
import { BgMsgResponseTypes } from "../../types";
import { get } from "lodash";
import { getPasswordHash } from "../getter";

let backgroundPort = null;
const log = (msg: string) => {
  const background = chrome.extension.getBackgroundPage();
  background.console.log("popup: ", msg);
};

function* waitBackgroundResponse(type: string) {
  const action: uiActions.BackgroundReceiveMessageType = yield take(
    (a: any) =>
      a.type === uiActions.RECEIVE_BACKGROUND_MESSAGE && a.payload.type === type
  );
  return action.payload;
}

function setupPopupUnloadListener() {
  const background = chrome.extension.getBackgroundPage();

  addEventListener(
    "unload",
    () => {
      background.window.everisigner.startTimer();
    },
    true
  );
}

function* createAccountHandler() {
  while (true) {
    const action = yield take(storeActions.ACCOUNT_CREATE);
    console.log("saga", action);
  }
}

function* setPasswordHandler() {
  while (true) {
    const action: uiActions.SetPasswordType = yield take([
      uiActions.SET_PASSWORD,
      uiActions.LOG_IN
    ]);

    const { payload: password } = action;

    // hash password with bcrypt
    const hash = PasswordService.hashPassword(password);
    log(
      JSON.stringify(PasswordService.generateMnemonicWords(password, "english"))
    );

    // store hash in store
    yield put(storeActions.passwordSet(hash));
    yield put(storeActions.landPlane("password", password));

    // send password to background.js
    backgroundPort.postMessage({
      type: "popup/passwordReceive",
      payload: password
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
  try {
    // do some cleanup on popup unload
    yield call(setupPopupUnloadListener);

    if (backgroundPort === null) {
      backgroundPort = chrome.runtime.connect({ name: "background" });
      // setup background channel, this needs to be called before waiting on any background message
      yield fork(backgroundChannelHandler, backgroundPort);

      // tell background that pop up is started
      backgroundPort.postMessage({ type: "popup/started" });

      // At initialize phase need to perform a handshake. The background.js will let popup know
      // what is the current state.
      // 1. background.js has a password
      //    1.1 verify password with hash and store in the state
      // 2. background.js doesn't have a password
      //    2.1 if local has a password hash, popup should be locked
      //    2.2 if local doesn't have a password hash, app is not initialized with a password
      const bgMsgPassword: BgMsgResponseTypes = yield call(
        waitBackgroundResponse,
        "background/password"
      );

      const password = get(bgMsgPassword.payload, "data.password", null);
      log(JSON.stringify(password));

      const passwordHash = yield select(getPasswordHash);

      if (password !== null && passwordHash !== null) {
        // verify password from background against local password hash
        const isPasswordValid = PasswordService.verifyPassword(
          password,
          passwordHash
        );

        if (!isPasswordValid) {
          // if not lock
          yield put(storeActions.passwordRemove());
        } else {
          log("password valid");
          yield put(storeActions.landPlane("password", password));
          // start password lock timer
          backgroundPort.postMessage({ type: "popup/startPasswordTimer" });
        }
      }
    }

    yield fork(createAccountHandler);
    yield fork(setPasswordHandler);
  } catch (e) {
    // TODO consider restart saga
    console.log("saga root error: ", e);
  }
}

export default rootSaga;
