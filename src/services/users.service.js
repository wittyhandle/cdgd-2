import api  from '../utils/api';


const getUsers = (limit, offset, order, direction) => (
    api
        .get(`/api/v1/users/${limit}/${offset}/${order}/${direction}`)
        .then(users => { return users.users })
);

const isUnique = username => (
    api
        .get(`/api/v1/users/unique/${username}`).then(d => {
            return d.data.unique;
        })
);

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

const deleteUser = id => {
	return api.delete(`/api/v1/users/${id}`)
		.then(() => true)
		.catch(() => false);
};


export const userService = {
    isUnique, createUser, getUsers, deleteUser
};
