const config = require('config');
const Bundler = require('parcel-bundler');
const path = require('path');
const buildSW = require('./build-service-worker');

const projectRoot = path.join(__dirname, '..');
const file = path.join(projectRoot, 'src', 'client', 'index.html');

const options = {
  target: 'browser',
  outDir: path.join(projectRoot, 'dist', 'client'),
  cacheDir: path.join(projectRoot, '.cache', 'client'),
  publicUrl: './client',
  watch: process.argv.includes('watch'),
};

if (config.server.protocol === 'https') {
  options.https = {
    cert: config.ssl.certificatePath,
    key: config.ssl.privateKeyPath,
  };
}

const bundler = new Bundler(file, options);

bundler.on('bundled', buildSW);

bundler.bundle();
