import { Router } from 'express';
import * as AuthenticationController from 'web/controllers/AuthenticationController';
import * as ClientController from 'web/controllers/ClientController';
import * as SteamAuthenticationController from 'providers/steam/authentication/SteamAuthenticationController';

export default function createRouter() {
  const router = Router();

  router.get(
    '/',
    ClientController.index,
  );
  router.get(
    '/service-worker.js',
    ClientController.serviceWorker,
  );
  router.get(
    '/sign-in/steam',
    AuthenticationController.saveTarget,
    SteamAuthenticationController.authenticate,
  );
  router.get(
    '/sign-in/steam/return',
    SteamAuthenticationController.authenticate,
    AuthenticationController.createJWT,
    AuthenticationController.redirectToTarget,
  );

  return router;
}
