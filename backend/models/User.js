const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const userFields = ['id', 'userName', 'email', 'firstName', 'lastName'];

exports.create = user => {
    delete user.password2;
    return knex('users')
        .insert(user)
};

exports.getUsers = (limit, offset) => (
    knex
        .select(...userFields)
        .from('users')
        .limit(limit)
        .offset(offset)
);

exports.getUserCount = () => (
    knex('users').count('userName', {as: 'u'})
);

exports.getUserCountByUsername = username => (
    knex('users')
        .count('userName', {as: 'u'})
        .where('userName', username)
);

exports.getPasswordByUsername = userName => (
    knex('users')
        .where({userName})
        .select('password')
);

exports.getUserByUsername = userName => (
    knex('users')
        .where({userName})
        .select(...userFields)
);