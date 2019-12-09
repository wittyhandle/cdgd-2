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

exports.deleteClients = ids =>
  knex("clients")
    .whereIn("id", ids)
    .del();

exports.updateClient = (id, client) =>
  knex("clients")
    .where("id", id)
    .update(client);

exports.getClientCount = () => knex("clients").count("id", { as: "i" });
