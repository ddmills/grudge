import config from 'config';
import path from 'path';

const root = path.join(__dirname, '..');

export function get(...parts) {
  return path.join(root, ...parts);
}

export function client(...parts) {
  return path.join(config.get('client.path'), ...parts);
}

export function server(...parts) {
  return path.join(root, ...parts);
}
