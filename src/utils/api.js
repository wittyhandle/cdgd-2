import axios from 'axios';
import {authenticationService} from '../services';

let instance = axios.create({
    baseURL: 'http://localhost:5000',
    responseType: 'json'
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization =  `Bearer ${authenticationService.getUserToken()}`;
    return config;
});

instance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {

    console.log('the codes', error.response.status);
    if ([401, 403].indexOf(error.response.status) !== -1) {
        authenticationService.logout();
        window.location.reload(true);
    }

    return Promise.reject(error);
});

export default instance;