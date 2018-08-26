import * as UserService from 'services/UserService';
import Logger from 'utilities/Logger';

export default function createMiddleware() {
  return async (socket, next) => {
    try {
      const user = await UserService.getUser(socket.userId);

      Object.assign(socket, { user });

      next();
    } catch (error) {
      Logger.error(error);

      next(new Error('Could not find associated user'));
    }
  };
}
