import axios from 'axios'
import { endpoint } from './config';

export var token = ""

export const postLogin = () => {
    return axios.post(endpoint + '/login', {
        password: 'secret'
    })
}