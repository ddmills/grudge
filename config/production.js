const path = require('path');
const defaultsDeep = require('lodash.defaultsdeep');
const shared = require('./default');

module.exports = defaultsDeep({
  ssl: {
    certificatePath: path.join(__dirname, 'ssl', 'ssl.crt'),
    privateKeyPath: path.join(__dirname, 'ssl', 'ssl.key'),
  },
}, shared);
