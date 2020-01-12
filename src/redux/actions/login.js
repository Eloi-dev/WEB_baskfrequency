import { postLogin }from '../../api/login';
import { 
    POST_LOGIN_STARTED,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE,
} from './types';

export const post = (onSuccess) => {
    return (dispatch, getState) => {
        dispatch(postStarted());
        postLogin()
        .then(res => {
            dispatch(postSuccess(res.data.account))
            if (onSuccess) {
                onSuccess();
            }
        }).catch(error => {
            dispatch(postFailure(error))
        }).finally(() => console.log("[POST /login]: new state: ", getState()))
    }
}

const postSuccess = adherent => ({
    type: POST_LOGIN_SUCCESS,
    payload: {
        ...adherent
    }
});

const postStarted = () => ({
    type: POST_LOGIN_STARTED,
});

const postFailure = error => ({
    type: POST_LOGIN_FAILURE,
    payload: {
        error
    }
});
