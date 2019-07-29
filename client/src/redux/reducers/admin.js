import { GET_DETAILS, UNMOUNT_ADMIN } from "../actions/types";

const inistialState = {
  details: null,
  zones: null,
  categories: null,
  phases: null
};

export default function(state = inistialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DETAILS:
      return {
        ...state,
        details: payload
      };
    case UNMOUNT_ADMIN:
      return inistialState;
    default:
      return state;
  }
}
