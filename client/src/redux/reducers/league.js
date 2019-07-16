import {
  START_LOADING_LEAGUE,
  GET_LEAGUES,
  GET_LEAGUES_FAILED,
  GET_LEAGUE,
  GET_LEAGUE_FAILED,
  UNMOUNT_LEAGUE
} from "../actions/types";

const inistialState = {
  leagues: [],
  currentLeague: null
};

export default function(state = inistialState, action) {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING_LEAGUE:
      return {
        ...state,
        isLoading: true
      };
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
    case UNMOUNT_LEAGUE:
      return {
        ...state,
        currentLeague: null
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
