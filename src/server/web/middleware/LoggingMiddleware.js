import morgan from 'morgan';

export default function createMiddleware() {
  return morgan('tiny');
}
