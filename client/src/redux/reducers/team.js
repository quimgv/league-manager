import {
    START_LOADING_TEAM,
    GET_TEAMS,
    GET_TEAMS_FAILED,
    GET_TEAM,
    GET_TEAM_FAILED,
    UNMOUNT_TEAM
  } from "../actions/types";
  
  const inistialState = {
    teams: [],
    currentTeam: null
  };
  
  export default function(state = inistialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case START_LOADING_TEAM:
        return {
          ...state,
          isLoading: true
        };
      case GET_TEAMS:
        return {
          ...state,
          teams: payload,
          isLoading: false
        };
      case GET_TEAM:
        return {
          ...state,
          currentTeam: payload,
          isLoading: false
        };
      case UNMOUNT_TEAM:
        return {
          ...state,
          currentTeam: null
        };
      case GET_TEAMS_FAILED:
        return {
          ...state,
          teams: [],
          isLoading: false
        };
      case GET_TEAM_FAILED:
        return {
          ...state,
          currentTeam: null,
          isLoading: false
        };
      default:
        return state;
    }
  }
  