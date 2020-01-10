import { combineReducers } from 'redux';
import adherents from './adherents';
import treasury from './treasury';
import login from './login';

export default combineReducers({login, adherents, treasury});