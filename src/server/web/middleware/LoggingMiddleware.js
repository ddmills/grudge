import config from 'config';
import morgan from 'morgan';

export default function createMiddleware() {
  const options = config.env === 'development' ? 'dev' : 'common';

  return morgan(options);
}
