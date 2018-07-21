require('dotenv').config();
const Bundler = require('parcel-bundler');
const childProcess = require('child_process');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'server', 'index.js');
const watch = process.argv.includes('watch');

const options = {
  target: 'node',
  outDir: path.join(__dirname, '..', 'dist', 'server'),
  cacheDir: path.join(__dirname, '..', '.cache', 'server'),
  watch,
};

const bundler = new Bundler(file, options);

let bundle = null;
let child = null;

bundler.on('bundled', (compiledBundle) => {
  bundle = compiledBundle;
});

bundler.on('buildEnd', () => {
  if (!bundle || !watch) {
    return;
  }

  if (child) {
    child.stdout.removeAllListeners('data');
    child.stderr.removeAllListeners('data');
    child.removeAllListeners('exit');
    child.kill();
  }
  child = childProcess.spawn('node', [bundle.name]);

  child.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  child.stderr.on('data', (data) => {
    process.stdout.write(data);
  });

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`); // eslint-disable-line no-console
    child = null;
  });

  bundle = null;
});

bundler.bundle();
