require('dotenv').config();
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

const bundler = new Bundler(file, options);

bundler.bundle();
