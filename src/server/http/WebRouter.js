import express, { Router } from 'express';
import { client } from '../utilities/Path';

export default function createRouter() {
  const router = Router();

  function index(request, response) {
    response.sendFile(client('index.html'));
  }

  function serviceWorker(request, response) {
    response.sendFile(client('service-worker.js'));
  }

  router.get('/', index);
  router.get('/service-worker.js', serviceWorker);
  router.use('/client', express.static(client()));

  return router;
}
