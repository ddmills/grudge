import * as Events from '@grudge/api-events';
import Logger from 'utilities/Logger';
import UserController from './controllers/UserController';
import LobbyController from './controllers/LobbyController';

const eventMap = [{
  event: Events.USER_GET,
  handler: UserController.get,
}, {
  event: Events.LOBBY_GET,
  handler: LobbyController.get,
}, {
  event: Events.LOBBY_CREATE,
  handler: LobbyController.create,
}, {
  event: Events.LOBBY_LIST,
  handler: LobbyController.list,
}];

export default class SocketRouter {
  static wrapResponse(handler) {
    return async (...request) => {
      const [callback] = request.slice(-1);
      const args = request.slice(0, request.length - 1);

      try {
        const result = await handler(...args);

        callback(null, result);
      } catch (error) {
        Logger.error(error.message);

        callback(error.message);
      }
    };
  }

  static attachListeners(socket) {
    eventMap.forEach((mapping) => {
      socket.on(mapping.event, SocketRouter.wrapResponse(mapping.handler));
    });
  }
}
