import { Router } from 'express';
import * as AuthController from 'web/controllers/AuthController';
import * as ClientController from 'web/controllers/ClientController';

export default function createRouter() {
  const router = Router();

  router.get('/', ClientController.index);
  router.get('/service-worker.js', ClientController.serviceWorker);
  router.get('/sign-in', AuthController.saveTarget, AuthController.authenticate);
  router.get('/sign-in/return', AuthController.authenticate, AuthController.redirectToTarget);

  return router;
}
