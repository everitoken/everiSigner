import { BgMsgResponseTypes } from "../types";

export const SET_PASSWORD = "ui/SET_PASSWORD";
export const LOG_IN = "ui/LOG_IN";
export const RECEIVE_BACKGROUND_MESSAGE = "background/RECEIVE_MESSAGE";
export const CREATE_DEFAULT_ACCOUNT = "CREATE_DEFAULT_ACCOUNT";

export type CreateDefaultAccountType = {
  type: typeof CREATE_DEFAULT_ACCOUNT;
  payload: { id: string; name: string };
};

export type SetPasswordType = {
  type: typeof SET_PASSWORD;
  payload: string;
};

export type LogInType = {
  type: typeof LOG_IN;
  payload: string;
};

export type BackgroundReceiveMessageType = {
  type: typeof RECEIVE_BACKGROUND_MESSAGE;
  payload: BgMsgResponseTypes;
};

export type UiActionTypes =
  | SetPasswordType
  | LogInType
  | CreateDefaultAccountType;
export type BackgroundActionTypes = BackgroundReceiveMessageType;

export const setPassword = (password: string): UiActionTypes => ({
  type: SET_PASSWORD,
  payload: password
});

export const logIn = (password: string): LogInType => ({
  type: LOG_IN,
  payload: password
});

export const createDefaultAccount = (
  id: string,
  name: string
): CreateDefaultAccountType => ({
  type: CREATE_DEFAULT_ACCOUNT,
  payload: { id, name }
});

export const receiveBackgroundMessage = (
  msg: BgMsgResponseTypes
): BackgroundReceiveMessageType => ({
  type: RECEIVE_BACKGROUND_MESSAGE,
  payload: msg
});
