const config = require('config');

module.exports = {
    "server": false,
    "proxy": `${config.server.protocol}://${config.server.host}:${config.server.port}`,
    "injectNotification": false
};
