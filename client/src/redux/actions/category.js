import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  CREATE_CATEGORY,
  CREATE_CATEGORY_FAILED
} from './types';
import axios from 'axios';

export const getCategories = leagueId => async dispatch => {
  try {
    const res = await axios.get(`/category/?league=${leagueId}`);
    dispatch({ type: GET_CATEGORIES, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_CATEGORIES_FAILED });
  }
};

export const createCategory = (
  name,
  gender,
  league,
  zone
) => async dispatch => {
  try {
    const res = await axios.post(`/category/`, {
      name: name ? name : null,
      gender: gender ? gender : null,
      league: league ? league : null,
      zone: zone ? zone : null
    });
    dispatch({ type: CREATE_CATEGORY, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: CREATE_CATEGORY_FAILED });
  }
};
