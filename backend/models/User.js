const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const createUser = user => ( knex('users').insert(user) );

const getUsers = () => (
    knex('users').select('id', 'userName', 'email', 'firstName', 'lastName')
);

const getUserCountByUsername = username => (
    knex('users').count('userName', {as: 'u'}).where('userName', username)
);

const getUserByCredentials = userName => (
    knex('users').where({userName}).select('password')
);

module.exports = {
    createUser,
    getUsers,
    getUserCountByUsername,
    getUserByCredentials
};