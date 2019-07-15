import { GET_LEAGUES, GET_LEAGUES_FAILED } from "../actions/types";

const inistialState = {
  leagues: [],
  isLoading: true
};

export default function(state = inistialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEAGUES:
      return {
        ...state,
        leagues: payload,
        isLoading: false
      };
    case GET_LEAGUES_FAILED:
      return {
          ...state,
          leagues: [],
          isLoading: false
      };
    default:
      return state;
  }
}