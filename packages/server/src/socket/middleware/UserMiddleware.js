import UserService from 'services/UserService';
import Logger from 'utilities/Logger';

export default function createMiddleware() {
  return async (socket, nextIO) => {
    Object.assign(socket, {
      user: await UserService.get(socket.userId),
    });

    socket.use(async (packet, next) => {
      try {
        const user = await UserService.get(socket.userId);

        Object.assign(packet[1], { user });

        next();
      } catch (error) {
        Logger.error(error);

        next(new Error('Could not find associated user'));
      }
    });
    nextIO();
  };
}
