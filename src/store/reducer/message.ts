import {
  SNACKBAR_MESSAGE_SHOW,
  SNACKBAR_MESSAGE_DISMISS,
  StoreActionTypes
} from "../action";

const defaultState = {
  message: "",
  variant: "info" as VariantType,
  open: false
};

type VariantType = "info" | "warning" | "error" | "success";

type MessageStageType = {
  message: string;
  variant: VariantType;
  open: boolean;
};

export default (
  state: MessageStageType = defaultState,
  action: StoreActionTypes
): MessageStageType => {
  switch (action.type) {
    case SNACKBAR_MESSAGE_SHOW:
      return {
        ...state,
        message: action.payload.message,
        open: true
      };
    case SNACKBAR_MESSAGE_DISMISS:
      return defaultState;

    default:
      return state;
  }
};
