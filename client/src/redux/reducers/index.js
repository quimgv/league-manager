import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';
import league from './league';

export default combineReducers({
    auth,
    modal,
    league
});