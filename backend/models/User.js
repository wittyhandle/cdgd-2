const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const createUser = user => ( knex('users').insert(user) );

const userFields = ['id', 'userName', 'email', 'firstName', 'lastName'];

const getUsers = () => (
    knex('users').select(...userFields)
);

const getUserCountByUsername = username => (
    knex('users').count('userName', {as: 'u'}).where('userName', username)
);

const getPasswordByUsername = userName => (
    knex('users').where({userName}).select('password')
);

const getUserByUsername = userName => (
    knex('users').where({userName}).select(...userFields)
);

module.exports = {
    createUser,
    getUsers,
    getUserCountByUsername,
    getPasswordByUsername,
    getUserByUsername
};