import axios from 'axios';
import { endpoint } from './config';

export const getAdherents = (token) => {
    const bearer = "Bearer " + token
    const headers = {
        headers: {
            "Authorization": bearer,
            "Content-Type": "application/json"
        }
    }
    return axios.get(endpoint + '/adherents', headers)
}

export const postAdherents = (token, adherent) => {
    const bearer = "Bearer " + token
    const headers = {
        headers: {
            "Authorization": bearer,
            "Content-Type": "application/json"
        }
    }
    return axios.post(endpoint + '/adherents', adherent, headers);
}

export const deleteAdherents = (token, adherent) => {
    const bearer = "Bearer " + token
    const headers = {
        headers: {
            "Authorization": bearer,
            "Content-Type": "application/json"
        }
    }
    return axios.delete(endpoint + '/adherents/' + adherent.id, headers);
}