# @grudge/server

> Node server for @grudge/client

## Postgres Database

* For developing with the database locally
    * [install docker](https://www.docker.com/)
    * `$ docker-compose up` in the root
* environment variables should be setup in order to connect or migrate
    * `POSTGRES_USER="username"`
    * `POSTGRES_PASSWORD="password"`
    * `POSTGRES_DB="db name"`
    * `POSTGRES_HOST="127.0.0.1"`
    * `POSTGRES_PROTOCOL="http"`
    * `POSTGRES_PORT=5432`
* [adminer](https://www.adminer.org/) is used in development to inspect the database
    * started when `$ docker-compose up` is ran
    * visit `127.0.0.1:8080` for the dashboard
    * use the creditials above to sign in
* interaction with the database is done with [knex](https://github.com/tgriesser/knex)
* to migrate the database
    * `$ npm run db:migrate`
* to rollback migrations
    * `$ npm run db:rollback`
* to make a new migration
    * `$ npm i knex -g`
    * `$ knex migrate:make migration_name`
