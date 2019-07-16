import {
    START_LOADING_TEAM,
    GET_TEAMS,
    GET_TEAMS_FAILED,
    GET_TEAM,
    GET_TEAM_FAILED,
    UNMOUNT_TEAM
  } from "./types";
  import axios from "axios";
  
  export const getTeams = () => async dispatch => {
    try {
      dispatch({ type: START_LOADING_TEAM });
      const res = await axios.get("/team");
      dispatch({ type: GET_TEAMS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_TEAMS_FAILED });
    }
  };
  
  export const getTeam = teamId => async dispatch => {
    try {
      dispatch({ type: START_LOADING_TEAM });
      const res = await axios.get(`/team/${teamId}`);
      setTimeout(() => {
        dispatch({ type: GET_TEAM, payload: res.data });
      }, 600);
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_TEAM_FAILED });
    }
  };
  
  export const unmountTeam = () => ({ type: UNMOUNT_TEAM });
  