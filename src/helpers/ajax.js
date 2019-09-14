import axios from 'axios';
import { authenticationService } from '../services';

const BASE_HOST = 'http://localhost:5000';

export const get = (url) => {

    const token = authenticationService.getUserToken();
    const config = {
      headers: {'Authorization': 'Bearer ' + token}
    };

    return axios
        .get(`${BASE_HOST}${url}`, config)
        .then(res => {
            return res.data;
        })
        .catch(e => {
            const error = (e.response && e.response.data) || e.response.statusText;
            return Promise.reject(error);
        });
};