import { getAdherents, postAdherents, deleteAdherents }from '../../api/transfers';
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
 } from './types';

export const get = () => {
    return (dispatch, getState) => {
        dispatch(getStarted());
        getAdherents(getState().login.account.token)
        .then(res => {
            dispatch(getSuccess(res.data.transfers))
        }).catch(error => {
            dispatch(getFailure(error))
        }).finally(() => console.log("[GET /transfers]: new state: ", getState()))
    }
}

const getSuccess = transfers => ({
    type: GET_TRANSFERS_SUCCESS,
    payload: transfers
});

const getStarted = () => ({
    type: GET_TRANSFERS_STARTED,
});

const getFailure = error => ({
    type: GET_TRANSFERS_FAILURE,
    payload: {
        error
    }
});

export const post = (transfer) => {
    return (dispatch, getState) => {
        dispatch(postStarted());
        postAdherents(getState().login.account.tokentransfer)
        .then(res => {
            transfer.id = res.data.transfer.id
            dispatch(postSuccess(transfer))
        }).catch(error => {
            dispatch(postFailure(error))
        }).finally(() => console.log("[POST /transfers]: new state: ", getState()))
    }
}

const postSuccess = transfer => ({
    type: POST_TRANSFERS_SUCCESS,
    payload: {
        ...transfer
    }
});

const postStarted = () => ({
    type: POST_TRANSFERS_STARTED,
});

const postFailure = error => ({
    type: POST_TRANSFERS_FAILURE,
    payload: {
        error
    }
});

export const del = (transfer) => {
    return (dispatch, getState) => {
        dispatch(deleteStarted());
        deleteAdherents(getState().login.account.token, transfer)
        .then(res => {
            dispatch(deleteSuccess(transfer))
        }).catch(error => {
            dispatch(deleteFailure(error))
        }).finally(() => console.log("[DELETE /transfers]: new state: ", getState()))
    }
}

const deleteSuccess = transfer => ({
    type: DELETE_TRANSFERS_SUCCESS,
    payload: {
        ...transfer
    }
});

const deleteStarted = () => ({
    type: DELETE_TRANSFERS_STARTED,
});

const deleteFailure = error => ({
    type: DELETE_TRANSFERS_FAILURE,
    payload: {
        error
    }
});
