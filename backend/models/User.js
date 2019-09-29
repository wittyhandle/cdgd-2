const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const createUser = user => {
    return knex('users').insert(user);
};

module.exports = {
    createUser
};