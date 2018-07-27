const { injectManifest } = require('workbox-build');

const buildServiceWorker = () => {
  injectManifest({
    swSrc: 'src/client/service-worker.js',
    swDest: 'dist/client/service-worker.js',
    globPatterns: [
      '**/*.{js,png,html,css}',
    ],
    globDirectory: 'dist/client',
    modifyUrlPrefix: {
      '': 'client/',
    },
  }).catch((err) => {
    console.error(err);
  });
};

module.exports = buildServiceWorker;
