// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      user: "cdgd",
      password: "password",
      database: "cdgd"
    },
    pool: { min: 0, max: 7 }
  }
};
