const path = require('path');
const defaultsDeep = require('lodash.defaultsdeep');
const shared = require('./default');

module.exports = defaultsDeep({
  ssl: {
    certificatePath: path.join(__dirname, 'ssl', 'ssl.cert'),
    keyPath: path.join(__dirname, 'ssl', 'ssl.key'),
  },
}, shared);
