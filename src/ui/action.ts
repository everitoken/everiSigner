export const SET_PASSWORD = "ui/SET_PASSWORD";
export const RECEIVE_BACKGROUND_MESSAGE = "background/RECEIVE_MESSAGE";

export type SetPasswordType = {
  type: typeof SET_PASSWORD;
  payload: string;
};

export type BackgroundReceiveMessageType = {
  type: typeof RECEIVE_BACKGROUND_MESSAGE;
  payload: any;
};

export type UiActionTypes = SetPasswordType;
export type BackgroundActionTypes = BackgroundReceiveMessageType;

export const setPassword = (password: string): UiActionTypes => ({
  type: SET_PASSWORD,
  payload: password
});

export const receiveBackgroundMessage = (
  msg: any
): BackgroundReceiveMessageType => ({
  type: RECEIVE_BACKGROUND_MESSAGE,
  payload: msg
});
