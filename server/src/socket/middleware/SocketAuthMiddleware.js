import { isValid } from 'utilities/JWT';

export default function createMiddleware() {
  return (socket, next) => {
    const { token } = socket.handshake.query;

    try {
      const { userId } = isValid(token);

      socket.userId = userId; // eslint-disable-line no-param-reassign

      return next();
    } catch (error) {
      return next(new Error('Socket Authentication Error'));
    }
  };
}
