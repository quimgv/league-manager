import {
  GET_LEAGUES,
  GET_LEAGUES_FAILED,
  GET_LEAGUE,
  GET_LEAGUE_FAILED
} from "../actions/types";

const inistialState = {
  leagues: [],
  currentLeague: null,
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
    case GET_LEAGUE:
      return {
        ...state,
        currentLeague: payload,
        isLoading: false
      };
    case GET_LEAGUES_FAILED:
      return {
        ...state,
        leagues: [],
        isLoading: false
      };
    case GET_LEAGUE_FAILED:
      return {
        ...state,
        currentLeague: null,
        isLoading: false
      };
    default:
      return state;
  }
}
