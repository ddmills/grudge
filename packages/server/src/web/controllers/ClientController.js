import { client } from 'utilities/Path';

export function index(request, response) {
  response.sendFile(client('index.html'));
}

export function serviceWorker(request, response) {
  response.sendFile(client('service-worker.js'));
}
