/* eslint-env serviceworker */
/* global workbox:false */

/**
 * Workbox is a library for generating Service Workers
 * https://developers.google.com/web/tools/workbox
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.setConfig({ debug: false });

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
  new RegExp('/client/(.*)'),
  workbox.strategies.networkFirst(),
);
