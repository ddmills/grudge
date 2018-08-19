import * as AuthService from 'services/AuthService';
import Logger from 'utilities/Logger';

export default function createMiddleware() {
  return async (socket, next) => {
    try {
      const user = await AuthService.getUser(socket.userId);

      socket.user = user; // eslint-disable-line no-param-reassign

      next();
    } catch (error) {
      Logger.error(error);

      next(new Error('Could not find associated user'));
    }
  };
}
