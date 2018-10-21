import helmet from 'helmet';
import config from 'config';

export default function createMiddleware() {
  const connectProtocol = config.server.protocol === 'https' ? 'wss://' : 'ws://';
  const workboxCDN = 'https://storage.googleapis.com';
  const steamCDN = 'https://steamcdn-a.akamaihd.net';
  const loremFlicker = 'https://loremflickr.com';

  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'blob:'],
        connectSrc: ["'self'", `${connectProtocol}${config.server.host}:*`],
        scriptSrc: ["'self'", workboxCDN],
        imgSrc: ["'self'", steamCDN, loremFlicker],
      },
    },
    referrerPolicy: {
      policy: 'same-origin',
    },
  });
}
