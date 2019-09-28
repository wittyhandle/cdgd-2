import api  from '../utils/api';

const isUnique = (username) => {

    return api.get(`/api/v1/users/unique/${username}`).then(d => {
        console.log('d', d.data.unique);
        return d.data.unique;
    });
};


export const userService = {
    isUnique
};