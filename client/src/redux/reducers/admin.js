import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  GET_DETAILS,
  GET_DETAILS_FAILED,
  GET_PHASES,
  GET_PHASES_FAILED,
  GET_ZONES,
  GET_ZONES_FAILED,
  CREATE_CATEGORY,
  UNMOUNT_ADMIN
} from '../actions/types';

const inistialState = {
  details: null,
  zones: null,
  categories: null,
  phases: null
};

export default function(state = inistialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DETAILS:
      return {
        ...state,
        details: payload
      };
    case GET_DETAILS_FAILED:
      return {
        ...state,
        details: null
      };
    case GET_ZONES:
      return {
        ...state,
        zones: payload
      };
    case GET_ZONES_FAILED:
      return {
        ...state,
        zones: null
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload
      };
    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        categories: null
      };
    case GET_PHASES:
      return {
        ...state,
        phases: payload
      };
    case GET_PHASES_FAILED:
      return {
        ...state,
        phases: null
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload]
      };
    case UNMOUNT_ADMIN:
      return inistialState;
    default:
      return state;
  }
}
