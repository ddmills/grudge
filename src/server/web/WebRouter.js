import { Router } from 'express';
import * as AuthenticationController from 'web/controllers/AuthenticationController';
import * as ClientController from 'web/controllers/ClientController';

export default function createRouter() {
  const router = Router();

  router.get('/', ClientController.index);
  router.get('/service-worker.js', ClientController.serviceWorker);
  router.get('/sign-in', AuthenticationController.saveTarget, AuthenticationController.authenticate);
  router.get('/sign-in/return', AuthenticationController.authenticate, AuthenticationController.associateUser, AuthenticationController.redirectToTarget);

  return router;
}
