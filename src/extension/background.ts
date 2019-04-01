// background.ts

// Responsibilities
//   * store password
//   * keep timeout to lock popup

let password = null;

// Handle popup state
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

const handleMessage = (message: any, port: chrome.runtime.Port) => {
  port.postMessage({ payload: Math.random() });
};

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "background");
  port.onMessage.addListener(function(message) {
    console.log(popupInitialized);
    if (message.payload === "popup.initialized") {
      initializePopup();
    }
    console.log(popupInitialized);

    if (!isPopupInitialized()) {
      return;
    }

    handleMessage(message, port);
  });

  port.onDisconnect.addListener(disconnectHandler);
});
