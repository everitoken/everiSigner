import { AppState } from "./reducer";
import { StartScreenNameType } from "../types";
import { get } from "lodash";

export const getPasswordHash = (state: AppState) =>
  state.authentication.password;

/**
 * If there is a temp password, app is active
 * If there is only a password hash, app is locked
 * If there is neither password nor hash, app should be initialized
 */
export const getStartScreenName = (
  state: AppState
): { name: StartScreenNameType } => {
  const password = get(state, "airport.password", false);

  if (password) {
    return { name: "HOME" };
  }

  const passwordHash = state.authentication.password;
  if (passwordHash) {
    return { name: "LOGIN" };
  }

  return { name: "GET_STARTED" };
};

export const mapInputPassword = (state: AppState) => ({
  passwordHash: getPasswordHash(state)
});
