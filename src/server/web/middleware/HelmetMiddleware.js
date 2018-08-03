import helmet from 'helmet';
import config from 'config';

export default function createMiddleware() {
  const isDev = config.env === 'development';
  const connectProtocol = config.server.protocol === 'https' ? 'wss://' : 'ws://';

  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", `${connectProtocol}${config.server.host}:*`],
        scriptSrc: ["'self'"].concat(isDev ? ["'unsafe-eval'", "'nonce-browser-sync'"] : []),
      },
    },
    referrerPolicy: {
      policy: 'same-origin',
    },
  });
}
