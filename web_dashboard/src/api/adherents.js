import axios from 'axios';
import { endpoint } from './config';

const route = `${endpoint}/adherents`;

const headers = token => ({
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
})

export const getAdherents = (token) => {
    return axios.get(route, headers(token))
}

export const postAdherents = (token, adherent) => {
    return axios.post(route, adherent, headers(token));
}

export const deleteAdherents = (token, adherent) => {
    return axios.delete(`${route}/${adherent.id}`, headers(token));
}