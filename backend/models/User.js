const knex = require("knex")(require("../knexfile").development);

const userFields = ["id", "userName", "email", "firstName", "lastName"];

exports.create = user => {
  // eslint-disable-next-line no-param-reassign
  delete user.password2;
  return knex("users").insert(user);
};

exports.getUsers = (limit, offset, order, direction) =>
  knex
    .select(...userFields)
    .from("users")
    .orderBy(order, direction)
    .limit(limit)
    .offset(offset);

exports.getUserCount = () => knex("users").count("userName", { as: "u" });

exports.getUserCountByUsername = username =>
  knex("users")
    .count("userName", { as: "u" })
    .where("userName", username);

exports.getPasswordByUsername = userName =>
  knex("users")
    .where({ userName })
    .select("password");

exports.getUserByUsername = userName =>
  knex("users")
    .where({ userName })
    .select(...userFields);

exports.deleteUser = id =>
  knex("users")
    .where("id", id)
    .del();

exports.updateUser = (userName, user) =>
  knex("users")
    .where("userName", userName)
    .update(user);
