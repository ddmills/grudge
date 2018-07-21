import express from 'express';
import path from 'path';
import config from 'config';
import spdy from 'spdy';
import fs from 'fs';

const app = express();
const clientPath = path.join(__dirname, '..', 'client');

app.get('/', (req, res) => res.sendFile(path.join(clientPath, 'index.html')));
app.use('/client', express.static(clientPath));

const options = {
  key: fs.readFileSync(config.ssl.keyPath),
  cert: fs.readFileSync(config.ssl.certificatePath),
};

spdy.createServer(options, app).listen(config.server.port);
