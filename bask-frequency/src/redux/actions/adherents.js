import { getAdherents, postAdherents, deleteAdherents }from '../../api/adherents';
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
 } from './types';

export const get = (token) => {
    return (dispatch, getState) => {
        dispatch(getStarted());
        getAdherents(getState().login.account.token)
        .then(res => {
            dispatch(getSuccess(res.data.adherents))
        }).catch(error => {
            dispatch(getFailure(error))
        }).finally(() => console.log("[GET /adherents]: new state: ", getState()))
    }
}

const getSuccess = adherents => ({
    type: GET_ADHERENTS_SUCCESS,
    payload: adherents
});

const getStarted = () => ({
    type: GET_ADHERENTS_STARTED,
});

const getFailure = error => ({
    type: GET_ADHERENTS_FAILURE,
    payload: {
        error
    }
});

export const post = (token, adherent) => {
    return (dispatch, getState) => {
        dispatch(postStarted());
        postAdherents(token, adherent)
        .then(res => {
            adherent.id = res.data.adherent.id
            dispatch(postSuccess(adherent))
        }).catch(error => {
            dispatch(postFailure(error))
        }).finally(() => console.log("[POST /adherents]: new state: ", getState()))
    }
}

const postSuccess = adherent => ({
    type: POST_ADHERENTS_SUCCESS,
    payload: {
        ...adherent
    }
});

const postStarted = () => ({
    type: POST_ADHERENTS_STARTED,
});

const postFailure = error => ({
    type: POST_ADHERENTS_FAILURE,
    payload: {
        error
    }
});

export const del = (token, adherent) => {
    return (dispatch, getState) => {
        dispatch(deleteStarted());
        deleteAdherents(token, adherent)
        .then(res => {
            dispatch(deleteSuccess(adherent))
        }).catch(error => {
            dispatch(deleteFailure(error))
        }).finally(() => console.log("[DELETE /adherents]: new state: ", getState()))
    }
}

const deleteSuccess = adherent => ({
    type: DELETE_ADHERENTS_SUCCESS,
    payload: {
        ...adherent
    }
});

const deleteStarted = () => ({
    type: DELETE_ADHERENTS_STARTED,
});

const deleteFailure = error => ({
    type: DELETE_ADHERENTS_FAILURE,
    payload: {
        error
    }
});
