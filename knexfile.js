const config = require('config');

module.exports = {
  client: 'postgresql',
  version: config.postgres.version,
  connection: {
    user: config.postgres.user,
    password: config.postgres.password,
    database: config.postgres.db,
    host: config.postgres.host,
    port: config.postgres.port,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
  },
};
