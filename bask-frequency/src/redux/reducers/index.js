import { combineReducers } from 'redux';
import adherents from './adherents';
import treasury from './treasury';

export default combineReducers({adherents, treasury});