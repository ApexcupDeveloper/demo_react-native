import axios from 'axios';
import { apiURL } from './baseURL'

export default axios.create({
    baseURL: apiURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": "true"
    },
});