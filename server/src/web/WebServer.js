import config from 'config';
import http from 'http';
import spdy from 'spdy';
import fs from 'fs';

export default function createServer(app, callback = () => {}) {
  if (config.server.protocol === 'https') {
    const options = {
      key: fs.readFileSync(config.ssl.privateKeyPath),
      cert: fs.readFileSync(config.ssl.certificatePath),
    };

    return spdy.createServer(options, app, callback);
  }

  return http.createServer(app, callback);
}
