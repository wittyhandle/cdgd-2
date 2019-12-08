exports.up = knex => {
  return knex.schema.createTable("clients", t => {
    t.increments("id").primary();
    t.string("email").notNullable();
    t.string("firstName").notNullable();
    t.string("lastName").notNullable();
    t.timestamps(false, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTable("clients");
};
