const config = require('config');


const options = {
  proxy: `${config.server.protocol}://${config.server.host}:${config.server.port}`,
  open: false,
  server: false,
  injectNotification: false,
};

if (config.server.protocol === 'https') {
  options.https = true;
  options.httpModule = 'spdy';
}

module.exports = options;
