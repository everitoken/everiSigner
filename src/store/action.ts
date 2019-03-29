import * as Types from "../types";

export const ACCOUNT_CREATE = "ACCOUNT_CREATE";

export interface AccountCreateType {
  type: typeof ACCOUNT_CREATE;
  payload: Types.AccountType;
}

export type ActionTypes = AccountCreateType;
