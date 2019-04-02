import { AppState } from "./reducer";
import { StartScreenNameType } from "../types";
import { get } from "lodash";

export const getPasswordHash = (state: AppState) =>
  state.authentication.password;

export const getStartScreenName = (
  state: AppState
): { name: StartScreenNameType } => {
  const password = get(state, "airport.password", false);

  if (password) {
    return { name: "HOME" };
  }

  const passwordHash = state.authentication.password;
  if (passwordHash) {
    return { name: "INPUT_PASSWORD" };
  }

  return { name: "GET_STARTED" };
};
