import { 
    GET_ADHERENTS_STARTED,
    GET_ADHERENTS_SUCCESS,
    GET_ADHERENTS_FAILURE,
    POST_ADHERENTS_STARTED,
    POST_ADHERENTS_SUCCESS,
    POST_ADHERENTS_FAILURE,
    DELETE_ADHERENTS_STARTED,
    DELETE_ADHERENTS_SUCCESS,
    DELETE_ADHERENTS_FAILURE,
 } from '../actions/types';

 import reduceReducers from 'reduce-reducers';

const initialState = {
    loading: false,
    all: [],
    error: null
}

const get = (state = initialState, action) => {
    switch(action.type) {
        case GET_ADHERENTS_STARTED:
            return {
                ...state,
                loading: true,
            };
        case GET_ADHERENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                all: action.payload
            };
        case GET_ADHERENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

const post = (state = initialState, action) => {
    switch(action.type) {
        case POST_ADHERENTS_STARTED:
            return {
                ...state,
                loading: true,
            }
        case POST_ADHERENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                all: [action.payload, ...state.all]
            }
        case POST_ADHERENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

const del = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_ADHERENTS_STARTED:
            return {
                ...state,
                loading: true,
            }
        case DELETE_ADHERENTS_SUCCESS:
            for (var i=0; i < state.all.length; i++) {
                if (state.all[i].id === action.payload.id) {
                    state.all.splice(i, 1);
                    break;
                }
            }
            return {
                ...state,
                loading: false,
                error: null,
                all: [...state.all]
            }
        case DELETE_ADHERENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default reduceReducers(initialState, get, post, del);