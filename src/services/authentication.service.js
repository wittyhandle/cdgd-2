import axios from 'axios';

const USER_DATA = 'user_data';

const login = (username, password) => {

    const credentials = {username, password};

    return axios
        .post('http://localhost:5000/api/v1/users/authenticate', credentials)
        .then(res => {
            sessionStorage.setItem(USER_DATA, JSON.stringify(res.data));
            return username;
        })
        .catch(e => {
            const error = (e.response && e.response.data) || e.response.statusText;
            return Promise.reject(error);
        });
};

const verifyUser = () => {

    const token = getUserToken();
    return axios
        .get(`http://localhost:5000/api/v1/users/verify/${token}`)
        .then(res => {
            return res.data.data.decoded.data;
        })
        .catch(e => {
            const error = (e.response && e.response.data) || e.response.statusText;
            return Promise.reject(error);
        });
};

const getUserToken = () => {
    const userObj = JSON.parse(sessionStorage.getItem(USER_DATA));
    return userObj && userObj.token;
};

const getUserName = () => {
    const userObj = JSON.parse(sessionStorage.getItem(USER_DATA));
    return userObj && userObj.username;
};

export const authenticationService = {
    login, getUserToken, verifyUser, getUserName
};