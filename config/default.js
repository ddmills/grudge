require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  session: {
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    unset: 'destroy',
    saveUninitialized: true,
  },
  ssl: {
    certificatePath: '',
    privateKeyPath: '',
  },
};
