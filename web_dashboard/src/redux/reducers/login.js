import {
    POST_LOGIN_STARTED,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE,
 } from '../actions/types';
import reduceReducers from 'reduce-reducers';

const initialState = {
    loading: false,
    account: {},
    error: null
}


const post = (state = initialState, action) => {
    switch(action.type) {
        case POST_LOGIN_STARTED:
            return {
                ...state,
                loading: true,
            };
        case POST_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                account: action.payload
            };
        case POST_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default reduceReducers(initialState, post);