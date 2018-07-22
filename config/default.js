require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  ssl: {
    certificatePath: '',
    privateKeyPath: '',
  },
};
