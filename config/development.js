const path = require('path');
const defaultsDeep = require('lodash.defaultsdeep');
const shared = require('./default');

module.exports = defaultsDeep({
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 8000,
    protocol: process.env.PROTOCOL || 'https',
  },
  ssl: {
    certificatePath: path.join(__dirname, 'ssl', 'ssl.crt'),
    privateKeyPath: path.join(__dirname, 'ssl', 'ssl.key'),
  },
}, shared);
