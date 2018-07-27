import express from 'express';
import path from 'path';
import config from 'config';
import http from 'http';
import spdy from 'spdy';
import fs from 'fs';

const app = express();
const clientPath = path.join(__dirname, '..', 'client');

app.get('/', (req, res) => res.sendFile(path.join(clientPath, 'index.html')));
app.use('/client', express.static(clientPath));
app.get('/service-worker.js', (req, res) => res.sendFile(path.join(clientPath, 'service-worker.js')));

if (config.server.protocol === 'https') {
  const options = {
    key: fs.readFileSync(config.ssl.privateKeyPath),
    cert: fs.readFileSync(config.ssl.certificatePath),
  };

  spdy.createServer(options, app).listen(config.server.port);
} else {
  http.createServer(app).listen(config.server.port);
}
