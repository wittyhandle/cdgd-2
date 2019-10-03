const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const createUser = user => ( knex('users').insert(user) );

const getUsers = () => (
    knex('users').select('userName', 'email', 'firstName', 'lastName')
);

module.exports = {
    createUser,
    getUsers
};