const pino = require("pino");
const knex = require("knex")(require("../knexfile").development);

const logger = pino({ level: process.env.LOG_LEVEL || "info" });

exports.create = client => {
  logger.info("Saving the client object: %o", client);

  const { email, firstName, lastName } = client;

  return knex.transaction(trx => {
    knex("clients")
      .transacting(trx)
      .insert({ email, firstName, lastName })
      .then(res => {
        const id = res[0];

        const addresses = client.addresses.map(a => {
          const { address, address2, city, state, zip } = a;
          return {
            client_id: id,
            address,
            address2,
            city,
            state,
            zip
          };
        });

        logger.info("Saving addresses for client: %o", addresses);

        return knex("addresses")
          .transacting(trx)
          .insert(addresses);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

exports.getClients = (limit, offset, order, direction) => {
  return knex
    .select(["id", "email", "firstName", "lastName"])
    .from("clients")
    .orderBy(order, direction)
    .limit(limit)
    .offset(offset);
};

exports.deleteClients = ids =>
  knex("clients")
    .whereIn("id", ids)
    .del();

exports.updateClient = (id, client) =>
  knex("clients")
    .where("id", id)
    .update(client);

exports.getClientCount = () => knex("clients").count("id", { as: "i" });
