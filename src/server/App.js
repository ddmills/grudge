import express from 'express';
import WebRouter from 'web/WebRouter';

export default function createApp() {
  const app = express();

  app.use('/*', WebRouter());

  return app;
}
