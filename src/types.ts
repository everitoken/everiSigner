export type StartScreenNameType = "GET_STARTED" | "HOME" | "LOGIN";
export interface AccountType {
  id: string;
  name: string;
  createdAt: Date;
}

export interface AuthenticationType {
  password?: string;
}

// TODO: check native types
export interface WithRouterType {
  history: any;
  match: any;
  location: any;
}

export type PasswordReceiveBgMsgSendType = {
  type: "popup/passwordReceive";
  payload: string;
};

export type PopupStartedBgMsgSendType = {
  type: "popup/started";
  payload: null;
};

export type PopupStartPasswordTimerType = {
  type: "popup/startPasswordTimer";
};

export type BgMsgSendTypes =
  | PasswordReceiveBgMsgSendType
  | PopupStartPasswordTimerType
  | PopupStartedBgMsgSendType;

export type BgMsgResponseTypes = {
  type: "background/passwordSaved" | "background/password" | string;
  payload:
    | {
        success: true;
        data: {};
      }
    | {
        success: false;
        errMsg: string;
      };
};

export interface BgMethodsInterface {
  startTimer: (milliseconds: number) => void;
}
