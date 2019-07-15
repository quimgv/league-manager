import { GET_LEAGUES, GET_LEAGUES_FAILED } from "./types";
import axios from "axios";

export const getLeagues = () => async dispatch => {
  try {
    const res = await axios.get("/league");
    dispatch({ type: GET_LEAGUES, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_LEAGUES_FAILED });
  }
};
