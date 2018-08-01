import helmet from 'helmet';
import config from 'config';

export default function createMiddleware() {
  const connectProtocol = config.server.protocol === 'https' ? 'wss://' : 'ws://';

  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", `${connectProtocol}${config.server.host}:*`],
      },
    },
    referrerPolicy: {
      policy: 'same-origin',
    },
  });
}
