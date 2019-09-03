import axios from 'axios';

const login = (username, password) => {

    const credentials = {username, password};

    return axios
        .post('http://localhost:5000/api/v1/users/authenticate', credentials)
        .then(res => {
            localStorage.setItem('currentUser', JSON.stringify(res.data.data.token));
            return username;
        })
        .catch(e => {
            const error = (e.response && e.response.data) || e.response.statusText;
            return Promise.reject(error);
        });
};

export const authenticationService = {
    login
};