import {
  START_LOADING_LEAGUE,
  GET_LEAGUES,
  GET_LEAGUES_FAILED,
  GET_LEAGUE,
  GET_LEAGUE_FAILED,
  UNMOUNT_LEAGUE,
  UPDATE_LEAGUE,
  UPDATE_LEAGUE_FAILED
} from "./types";
import axios from "axios";

export const getLeagues = () => async dispatch => {
  try {
    dispatch({ type: START_LOADING_LEAGUE });
    const res = await axios.get("/league");
    dispatch({ type: GET_LEAGUES, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_LEAGUES_FAILED });
  }
};

export const getLeague = leagueId => async dispatch => {
  try {
    dispatch({ type: START_LOADING_LEAGUE });
    const res = await axios.get(`/league/${leagueId}`);
    setTimeout(() => {
      dispatch({ type: GET_LEAGUE, payload: res.data });
    }, 600);
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_LEAGUE_FAILED });
  }
};

export const unmountLeague = () => ({ type: UNMOUNT_LEAGUE });

export const updateLeagueDetails = (leagueId, updates) => async dispatch => {
  console.log(updates);

  if (updates.image) {
    console.log("IMAGE");
  }

  // try {
  //   dispatch({ type: START_LOADING_LEAGUE });
  //   const res = await axios.patch(`/league/${leagueId}`, updates);
  //   setTimeout(() => {
  //     dispatch({ type: UPDATE_LEAGUE, payload: res.data });
  //   }, 600);
  // } catch (err) {
  //   console.log(err);
  // }
};
