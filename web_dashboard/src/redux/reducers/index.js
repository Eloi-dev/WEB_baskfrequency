import { combineReducers } from 'redux';
import adherents from './adherents';
import transfers from './transfers';
import login from './login';

export default combineReducers({login, adherents, transfers});