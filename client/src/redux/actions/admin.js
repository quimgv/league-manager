import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  GET_DETAILS,
  GET_DETAILS_FAILED,
  GET_PHASES,
  GET_PHASES_FAILED,
  GET_ZONES,
  GET_ZONES_FAILED,
  UNMOUNT_ADMIN
} from "./types";
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

export const getZones = leagueId => async dispatch => {
  try {
    const res = await axios.get(`/zone/?league=${leagueId}`);
    dispatch({ type: GET_ZONES, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_ZONES_FAILED });
  }
};

export const getCategories = leagueId => async dispatch => {
  try {
    const res = await axios.get(`/category/?league=${leagueId}`);
    dispatch({ type: GET_CATEGORIES, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_CATEGORIES_FAILED });
  }
};

export const getPhases = () => async (dispatch, getState) => {
  const categories = getState().admin.categories;

  if (categories.length > 0) {
    let categoriesIds = [];
    for (let category of categories) {
      categoriesIds.push(category._id);
    }
    categoriesIds = categoriesIds.join();

    try {
      const res = await axios.get(`/phase/?categories=${categoriesIds}`);
      dispatch({ type: GET_PHASES, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_PHASES_FAILED });
    }
  }
};

export const unmountAdmin = () => ({ type: UNMOUNT_ADMIN });
