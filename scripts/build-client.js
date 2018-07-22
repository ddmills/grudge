const config = require('config');
const Bundler = require('parcel-bundler');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'client', 'index.html');

const options = {
  target: 'browser',
  outDir: path.join(__dirname, '..', 'dist', 'client'),
  cacheDir: path.join(__dirname, '..', '.cache', 'client'),
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

bundler.bundle();
