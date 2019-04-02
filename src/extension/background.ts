import { BackgroundReceiveMessageType } from "../ui/action";
import {
  BgMsgSendTypes,
  BgMsgResponseTypes,
  PasswordReceiveBgMsgSendType
} from "../types";

// * store password
// * keep timeout to lock popup

let password = null;

// Handle popup state
// it is only start communicating after popup.html is initialized
let popupInitialized = false;
const initializePopup = () => {
  popupInitialized = true;
  return undefined;
};
const isPopupInitialized = () => {
  return popupInitialized === true;
};
const resetPopup = () => {
  popupInitialized = false;
  return undefined;
};

// popup is closed
const disconnectHandler = (port: chrome.runtime.Port) => {
  // TODO or trigger a count down
  password = null;
  resetPopup();
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
  password = message.payload;
  console.log("password is set to ", password);
  postMessage(responseSuccessCreator("background/passwordSaved"));
};

const handleMessage = (
  message: BgMsgSendTypes,
  postMessage: PostMessageType
) => {
  switch (message.type) {
    case "popup/passwordReceive":
      passwordReceiveHandler(message, postMessage);
      break;

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
    if (message.type === "popup/initialized") {
      initializePopup();
      return;
    }

    // don't do anything if popup is not initialized
    if (!isPopupInitialized()) {
      return;
    }

    // start handling message based on types
    handleMessage(message, postMessage);
  });

  port.onDisconnect.addListener(disconnectHandler);
});
