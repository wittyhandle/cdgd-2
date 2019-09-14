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

    const url = error.response.config.url || '';
    const isAuthenticating = url.endsWith('/users/authenticate');

    if ([401, 403].indexOf(error.response.status) !== -1 && !isAuthenticating) {
        authenticationService.logout();
        window.location.reload(true);
    }

    return Promise.reject(error);
});

export default instance;