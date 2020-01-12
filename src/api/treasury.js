import axios from 'axios';
import { endpoint } from './config';

const route = `${endpoint}/treasury`;

const headers = token => ({
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
})

export const getTransfers = (token) => {
    return axios.get(route, headers(token))
}

export const postTransfers = (token, transfer) => {
    return axios.post(route, transfer, headers(token));
}

export const deleteTransfers = (token, transfer) => {
    return axios.delete(`${route}/${transfer.id}`, headers(token));
}