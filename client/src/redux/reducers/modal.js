import { SHOW_MODAL, HIDE_MODAL } from "../actions/types";

const inistialState = {
  open: false
};

export default function(state = inistialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        ...payload,
        open: true
      };
    case HIDE_MODAL:
      return inistialState;
    default:
      return state;
  }
}