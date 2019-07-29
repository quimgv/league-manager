import { GET_DETAILS, GET_DETAILS_FAILED, UNMOUNT_ADMIN } from "./types";
import axios from "axios";

export const getDetails = leagueId => async dispatch => {
  try {
    const res = await axios.get(`/league/${leagueId}`);
    dispatch({ type: GET_DETAILS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_DETAILS_FAILED });
  }
};

export const unmountAdmin = () => ({ type: UNMOUNT_ADMIN });
