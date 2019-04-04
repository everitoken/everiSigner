import { BackgroundReceiveMessageType } from "../ui/action";
import {
  BgMsgSendTypes,
  BgMsgResponseTypes,
  PasswordReceiveBgMsgSendType,
  PopupStartedBgMsgSendType,
  PopupStartPasswordTimerType,
  BgMethodsInterface
} from "../types";

let password = null;
let timerHandler = null;
const TIMEOUT = 1000 * 60 * 15;

const setPassword = (newPassword: string) => {
  password = newPassword;
};

const removePassword = () => {
  password = null;
};

// Handle popup state
// it is only start communicating after popup.html is initialized
let popupStarted = false;

const popupStart = () => {
  popupStarted = true;
  return undefined;
};
const isPopupStarted = () => {
  return popupStarted === true;
};
const resetPopup = () => {
  popupStarted = false;
  return undefined;
};

const backgroundMethods: BgMethodsInterface = {
  startTimer: (milliseconds: number = TIMEOUT) => {
    if (timerHandler) {
      clearTimeout(timerHandler);
      timerHandler = null;
    }

    console.log("password timeout timer started with timeout:", milliseconds);

    timerHandler = setTimeout(() => {
      removePassword();
      clearTimeout(timerHandler);
      timerHandler = null;
    }, milliseconds);
  }
};

// popup is closed
const disconnectHandler = (port: chrome.runtime.Port) => {
  // TODO or trigger a count down
  resetPopup();
  console.log("background", "disconnectHandler");
  port.disconnect();
};

type PostMessageType = (msg: BgMsgResponseTypes) => void;

// response creator helper
const responseSuccessCreator = (
  type: string,
  data: {} = {}
): BgMsgResponseTypes => ({
  type,
  payload: { success: true, data }
});

const responseErrorCreator = (
  type: string,
  errMsg: string
): BgMsgResponseTypes => ({
  type,
  payload: { success: false, errMsg }
});

const passwordReceiveHandler = (
  message: PasswordReceiveBgMsgSendType,
  postMessage: PostMessageType
) => {
  setPassword(message.payload);
  console.log("password is set to ", password);
  postMessage(responseSuccessCreator("background/passwordSaved"));
};

const popupStartedHandler = (
  message: PopupStartedBgMsgSendType,
  postMessage: PostMessageType
) => {
  console.log("popupStartedHandler", password);
  postMessage(responseSuccessCreator("background/password", { password }));
};

const passwordTimerHandler = (
  message: PopupStartPasswordTimerType,
  postMessage: PostMessageType
) => {
  // it is only started after you opened with a valid password
  // startPasswordTimer();
  postMessage(responseSuccessCreator("background/passwordTimerSet"));
};

const handleMessage = (
  message: BgMsgSendTypes,
  postMessage: PostMessageType
) => {
  switch (message.type) {
    case "popup/passwordReceive":
      passwordReceiveHandler(message, postMessage);
      break;
    case "popup/started":
      popupStartedHandler(message, postMessage);
      break;
    case "popup/startPasswordTimer": // currently unused
      passwordTimerHandler(message, postMessage);

    default:
      postMessage(
        responseErrorCreator(
          "background/unsupportedType",
          `Unsupported type ${message.type}`
        )
      );

      break;
  }
};

// setup communication channel
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "background");
  const postMessage: PostMessageType = msg => port.postMessage(msg);
  port.onMessage.addListener((message: BgMsgSendTypes) => {
    // listen on "popup/initialized" event
    if (message.type === "popup/started") {
      popupStart();
    }

    // don't do anything if popup is not initialized
    if (!isPopupStarted()) {
      return;
    }

    // start handling message based on types
    handleMessage(message, postMessage);
  });

  port.onDisconnect.addListener(disconnectHandler);
});

window.everisigner = backgroundMethods;
