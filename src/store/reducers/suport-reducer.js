import { ACTIVE_SUPORT, DELETE_SUPORT, SUPORT_HISTORY } from "../types";

const initialState = {
  suport: null,
  history: null,
};

export const suportReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_SUPORT:
      return {
        ...state,
        suport: action.payload,
      };
    case SUPORT_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case DELETE_SUPORT:
      return {
        ...state,
        history: action.payload,
      };
    default:
      return state;
  }
};
