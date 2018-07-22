const config = require('config');

module.exports = {
  proxy: `https://${config.server.host}:${config.server.port}`,
  open: false,
  server: false,
  injectNotification: false,
  httpModule: 'spdy',
  https: true,
};
