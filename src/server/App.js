import express from 'express';
import WebRouter from 'web/WebRouter';
import LoggingMiddleware from 'web/middleware/LoggingMiddleware';
import StaticMiddleware from 'web/middleware/StaticMiddleware';

export default function createApp() {
  const app = express();

  app.use('/*', LoggingMiddleware());
  app.use('/client', StaticMiddleware());
  app.use('/', WebRouter());

  return app;
}
