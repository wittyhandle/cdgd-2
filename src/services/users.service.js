import api  from '../utils/api';


const getUsers = (limit, offset) => (
    api.get(`/api/v1/users/${limit}/${offset}`)
        .then(users => { return users.users.items })
);

const isUnique = username => {

    return api.get(`/api/v1/users/unique/${username}`).then(d => {
        return d.data.unique;
    });
};

const createUser = user => {

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
    isUnique, createUser, getUsers
};