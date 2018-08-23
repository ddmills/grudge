/* eslint-disable import/no-extraneous-dependencies */
const { injectManifest } = require('workbox-build');

const buildServiceWorker = () => {
  injectManifest({
    swSrc: 'src/client/service-worker.js',
    swDest: 'dist/client/service-worker.js',
    globPatterns: [
      '**/*.{png,html}',
    ],
    globDirectory: 'dist/client',
    modifyUrlPrefix: {
      '': 'client/',
    },
  }).catch((err) => {
    console.error(err); // eslint-disable-line no-console
  });
};

module.exports = buildServiceWorker;
