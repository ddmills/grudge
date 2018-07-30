import express from 'express';
import WebRouter from 'web/WebRouter';
import SessionMiddleware from 'web/middleware/SessionMiddleware';
import LoggingMiddleware from 'web/middleware/LoggingMiddleware';
import StaticMiddleware from 'web/middleware/StaticMiddleware';
import PassportMiddleware from 'web/middleware/PassportMiddleware';

export default function createApp() {
  const app = express();

  app.use(SessionMiddleware());
  app.use(PassportMiddleware());
  app.use(LoggingMiddleware());
  app.use('/client', StaticMiddleware());
  app.use('/', WebRouter());

  return app;
}
