
exports.up = function(knex) {

    return knex.schema.createTable('users', function(t) {
        t.increments('id').primary();
        t.string('userName').notNullable();
        t.string('email').notNullable();
        t.string('firstName').notNullable();
        t.string('lastName').notNullable();
        t.string('password').notNullable();
        t.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
