import { 
    GET_TRANSFERS_STARTED,
    GET_TRANSFERS_SUCCESS,
    GET_TRANSFERS_FAILURE,
    POST_TRANSFERS_STARTED,
    POST_TRANSFERS_SUCCESS,
    POST_TRANSFERS_FAILURE,
    DELETE_TRANSFERS_STARTED,
    DELETE_TRANSFERS_SUCCESS,
    DELETE_TRANSFERS_FAILURE,
 } from '../actions/types';

 import reduceReducers from 'reduce-reducers';

const initialState = {
    loading: false,
    all: [],
    error: null
}

const get = (state = initialState, action) => {
    switch(action.type) {
        case GET_TRANSFERS_STARTED:
            return {
                ...state,
                loading: true,
            };
        case GET_TRANSFERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                all: action.payload
            };
        case GET_TRANSFERS_FAILURE:
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
        case POST_TRANSFERS_STARTED:
            return {
                ...state,
                loading: true,
            }
        case POST_TRANSFERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                all: [action.payload, ...state.all]
            }
        case POST_TRANSFERS_FAILURE:
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
        case DELETE_TRANSFERS_STARTED:
            return {
                ...state,
                loading: true,
            }
        case DELETE_TRANSFERS_SUCCESS:
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
        case DELETE_TRANSFERS_FAILURE:
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