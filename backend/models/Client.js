const knex = require("knex")(require("../knexfile").development);

exports.create = client => {
  return knex("clients").insert(client);
};
