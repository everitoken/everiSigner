export interface AccountType {
  id: string;
  name: string;
  createdAt: Date;
}

export interface AuthenticationType {
  status: string;
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

export type PopupInitializedBgMsgSendType = {
  type: "popup/initialized";
  payload: null;
};

export type BgMsgSendTypes =
  | PasswordReceiveBgMsgSendType
  | PopupInitializedBgMsgSendType;

export type BgMsgResponseTypes = {
  type: "background/passwordSaved" | string;
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
