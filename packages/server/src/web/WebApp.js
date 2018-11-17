import express from 'express';
import WebRouter from 'web/WebRouter';
import HelmetMiddleware from 'web/middleware/HelmetMiddleware';
import SessionMiddleware from 'web/middleware/SessionMiddleware';
import LoggingMiddleware from 'web/middleware/LoggingMiddleware';
import StaticMiddleware from 'web/middleware/StaticMiddleware';
import ClientMiddleware from 'web/middleware/ClientMiddleware';
import PassportMiddleware from 'web/middleware/PassportMiddleware';

export default function createApp() {
  const app = express();

  app.use(HelmetMiddleware());
  app.use(SessionMiddleware());
  app.use(PassportMiddleware());
  app.use(LoggingMiddleware());
  app.use('/client', ClientMiddleware());
  app.use('/static', StaticMiddleware());
  app.use('/', WebRouter());

  return app;
}
