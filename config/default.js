require('dotenv').config();

const path = require('path');

module.exports = {
  env: process.env.NODE_ENV || 'production',
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 8080,
    protocol: process.env.PROTOCOL || 'http',
  },
  ssl: {
    certificatePath: path.join(__dirname, 'ssl', 'ssl.cert'),
    keyPath: path.join(__dirname, 'ssl', 'ssl.key'),
  },
};
