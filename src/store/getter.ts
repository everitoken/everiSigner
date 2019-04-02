import { AppState } from "./reducer";

export const getPasswordHash = (state: AppState) =>
  state.authentication.password;
