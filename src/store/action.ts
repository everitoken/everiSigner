import * as Types from "../types";

export const ACCOUNT_CREATE = "ACCOUNT_CREATE";
export const PASSWORD_SET = "PASSWORD_SET";
export const PLANE_LAND = "PLANE_LAND";
export const PLANE_TAKEOFF = "PLANE_TAKEOFF";

export interface AccountCreateType {
  type: typeof ACCOUNT_CREATE;
  payload: Types.AccountType;
}

export interface PasswordSetType {
  type: typeof PASSWORD_SET;
  payload: string;
}

export interface PlaneLandType {
  type: typeof PLANE_LAND;
  payload: { name: string; value: any };
}

export interface PlaneTakeoffType {
  type: typeof PLANE_TAKEOFF;
  payload: string;
}

export const landPlane = (name: string, value: any): PlaneLandType => ({
  type: PLANE_LAND,
  payload: { name, value }
});

export const takeOffPlane = (name: string): PlaneTakeoffType => ({
  type: PLANE_TAKEOFF,
  payload: name
});


export type ActionTypes =
  | AccountCreateType
  | PasswordSetType
  | PlaneLandType
  | PlaneTakeoffType;
