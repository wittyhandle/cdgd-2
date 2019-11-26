exports.up = knex => {
  return knex.schema.createTable("users", t => {
    t.increments("id").primary();
    t.string("userName").notNullable();
    t.string("email").notNullable();
    t.string("firstName").notNullable();
    t.string("lastName").notNullable();
    t.string("password").notNullable();
    t.timestamps(false, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTable("users");
};
