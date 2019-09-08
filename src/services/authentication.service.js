import axios from 'axios';

const login = (username, password) => {

    const credentials = {username, password};

    return axios
        .post('http://localhost:5000/api/v1/users/authenticate', credentials)
        .then(res => {
            sessionStorage.setItem('currentUser', JSON.stringify(res.data.data));
            return username;
        })
        .catch(e => {
            const error = (e.response && e.response.data) || e.response.statusText;
            return Promise.reject(error);
        });
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem('currentUser'));
};

export const authenticationService = {
    login, getCurrentUser
};