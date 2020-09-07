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
    t.string("street").notNullable();
    t.string("street2").notNullable();
    t.string("state").notNullable();
    t.string("zip").notNullable();
    t.string("zipExtension").notNullable();
    t.timestamps(false, true);
  });

exports.down = knex => knex.schema.dropTable("addresses");
