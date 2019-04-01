export const SET_PASSWORD = "ui/SET_PASSWORD";

export type UiActionTypes = {
  type: typeof SET_PASSWORD;
  payload: string;
};

export const setPassword = (password: string): UiActionTypes => ({
  type: SET_PASSWORD,
  payload: password
});
