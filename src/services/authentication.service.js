import api  from '../utils/api';

const USER_DATA = 'user_data';

const login = (username, password) => {

    const credentials = {username, password};

    return api
        .post('/api/v1/users/authenticate', credentials)
        .then(res => {
            sessionStorage.setItem(USER_DATA, JSON.stringify(res));
            return username;
        })
        .catch(e => {
            const error = (e.response && e.response.data) || e.response.statusText;
            return Promise.reject(error);
        });
};

const logout = () => {
    sessionStorage.removeItem(USER_DATA);
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
    login, logout, getUserToken, getUserName
};