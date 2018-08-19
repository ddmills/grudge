import { Router } from 'express';
import * as AuthController from 'web/controllers/AuthController';
import * as ClientController from 'web/controllers/ClientController';
import * as SteamAuthController from 'providers/steam/auth/SteamAuthController';

export default function createRouter() {
  const router = Router();


  router.get(
    '/service-worker.js',
    ClientController.serviceWorker,
  );
  router.get(
    '/sign-in/steam',
    AuthController.saveTarget,
    SteamAuthController.authenticate,
  );
  router.get(
    '/sign-in/steam/return',
    SteamAuthController.authenticate,
    AuthController.createJWT,
    AuthController.redirectToTarget,
  );
  router.get(
    '/*',
    ClientController.index,
  );

  return router;
}
