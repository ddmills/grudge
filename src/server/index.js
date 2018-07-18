import express from 'express';
import path from 'path';
import config from 'config';

const app = express();
const clientPath = path.join(__dirname, '..', 'client');

app.get('/', (req, res) => res.sendFile(path.join(clientPath, 'index.html')));
app.use('/client', express.static(clientPath));

app.listen(config.server.port);
