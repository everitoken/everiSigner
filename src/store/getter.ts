import { AppState } from "./reducer";
import { StartScreenNameType } from "../types";
import { get } from "lodash";
import { AccountStateType } from "./reducer/accounts";
import { decryptAccount } from "../service/PasswordService";

export const getPasswordHash = (state: AppState) =>
  state.authentication.password;

export const getPassword = (state: AppState): string | false =>
  get(state, "airport.password", false);

export const getAuthenticatedStatus = (state: AppState) => {
  const password = getPassword(state);

  if (password) {
    return "password";
  }

  const passwordHash = state.authentication.password;

  if (passwordHash) {
    return "hash";
  }

  return "unknown";
};
/**
 * If there is a temp password, app is active
 * If there is only a password hash, app is locked
 * If there is neither password nor hash, app should be initialized
 */
export const getStartScreenName = (
  state: AppState
): { name: StartScreenNameType } => {
  const authStatus = getAuthenticatedStatus(state);

  if (authStatus === "password") {
    return { name: "HOME" };
  }

  if (authStatus === "hash") {
    return { name: "LOGIN" };
  }

  return { name: "GET_STARTED" };
};

export const mapInputPassword = (state: AppState) => ({
  passwordHash: getPasswordHash(state)
});

export const getSnackbarMessage = ({ message }: AppState) => message;

export const getDefaultAccountDecrypted = (state: AppState) => {
  const account = state.accounts.find(account => account.type === "default");
  const password = getPassword(state);

  if (!account || !password) {
    return { account: null };
  }

  return { account: decryptAccount(password, account) };
};
