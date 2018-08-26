import { isValid } from 'utilities/JWT';
import Logger from 'utilities/Logger';

export default function createMiddleware() {
  return (socket, next) => {
    try {
      const { token } = socket.handshake.query;
      const { userId } = isValid(token);

      socket.userId = userId; // eslint-disable-line no-param-reassign

      return next();
    } catch (error) {
      Logger.error(error);

      return next(new Error('Not Authenticated'));
    }
  };
}
