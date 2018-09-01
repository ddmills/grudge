import config from 'config';
import Knex from 'knex';

export default Knex({
  client: 'pg',
  version: config.postgres.version,
  connection: {
    user: config.postgres.user,
    password: config.postgres.password,
    database: config.postgres.db,
    host: config.postgres.host,
    port: config.postgres.port,
  },
});
