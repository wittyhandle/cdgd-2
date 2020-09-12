exports.up = knex =>
  knex.schema.createTable("addresses", t => {
    t.increments("id").primary();
    t.integer("client_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("clients")
      .onDelete("CASCADE")
      .index();
    t.string("address").notNullable();
    t.string("address2");
    t.string("city").notNullable();
    t.string("state").notNullable();
    t.string("zip").notNullable();
    t.timestamps(false, true);
  });

exports.down = knex => knex.schema.dropTable("addresses");
