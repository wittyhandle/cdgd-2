import api  from '../utils/api';

const isUnique = (username) => {

    return api.get(`/api/v1/users/unique/${username}`).then(d => {
        return d.data.unique;
    });
};

const createUser = user => {

    delete user.password2;

    return api
        .post('/api/v1/users/new', {user})
        .then(res => {
            return res.id;
        })
        .catch(e => {
            return Promise.reject(e);
        });
};


export const userService = {
    isUnique, createUser
};