import api  from '../utils/api';

const USER_DATA = 'user_data';

const login = (username, password) => {

    const credentials = {username, password};

    return api
        .post('/api/v1/users/authenticate', credentials)
        .then(res => {
            sessionStorage.setItem(USER_DATA, JSON.stringify(res));
            return res.user;
        })
        .catch(e => {
            return Promise.reject(e);
        });
};

const logout = () => {
    sessionStorage.removeItem(USER_DATA);
};

const getUserToken = () => {
    const userObj = JSON.parse(sessionStorage.getItem(USER_DATA));
    return userObj && userObj.token;
};

const getUser = () => {
    const userObj = JSON.parse(sessionStorage.getItem(USER_DATA));
    return userObj && userObj.user;
};

export const authenticationService = {
    login, logout, getUserToken, getUser
};