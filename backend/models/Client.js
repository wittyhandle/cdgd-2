const knex = require("knex")(require("../knexfile").development);

exports.create = client => {
  return knex("clients").insert(client);
};

exports.getClients = (limit, offset, order, direction) =>
  knex
    .select(["id", "email", "firstName", "lastName"])
    .from("clients")
    .orderBy(order, direction)
    .limit(limit)
    .offset(offset);

exports.getClientCount = () => knex("clients").count("id", { as: "i" });
