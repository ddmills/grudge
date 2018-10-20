const path = require('path');

module.exports = {
  env: process.env.NODE_ENV,
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: (60 * 60 * 60) * 5,
  },
  session: {
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    unset: 'destroy',
    saveUninitialized: true,
  },
  ssl: {
    certificatePath: path.join(__dirname, 'ssl', 'ssl.crt'),
    privateKeyPath: path.join(__dirname, 'ssl', 'ssl.key'),
  },
  steam: {
    key: process.env.STEAM_API_KEY,
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
    version: 10.5,
  },
  redis: {
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
