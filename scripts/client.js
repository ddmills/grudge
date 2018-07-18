const Bundler = require('parcel-bundler');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'client', 'index.html');
const options = {
  target: 'browser',
  outDir: path.join(__dirname, '..', 'dist', 'client'),
  cacheDir: path.join(__dirname, '..', '.cache', 'client'),
  publicUrl: './client',
};

const bundle = () => {
  const bundler = new Bundler(file, options);

  bundler.bundle();

  return bundler;
}

bundle();
