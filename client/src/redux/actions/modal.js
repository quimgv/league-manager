import { SHOW_MODAL, HIDE_MODAL } from "./types";

export const handleModal = modalContent => (dispatch, getState) => {
  const { open } = getState().modal;

  if (open === false) {
    dispatch({ type: SHOW_MODAL, payload: modalContent });
  } else if (open === true) {
    dispatch({ type: HIDE_MODAL });
  }
};