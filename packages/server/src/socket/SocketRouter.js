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
}, {
  event: Events.LOBBY_JOIN,
  handler: LobbyController.join,
}];

export default class SocketRouter {
  static wrapResponse(socket, handler) {
    return async (params, callback) => {
      const request = {
        user: socket.user,
        ...params,
      };

      try {
        const result = await handler(request);

        callback(null, result);
      } catch (error) {
        Logger.error(error.message);

        callback(error.message);
      }
    };
  }

  static attachListeners(socket) {
    eventMap.forEach((mapping) => {
      socket.on(mapping.event, SocketRouter.wrapResponse(socket, mapping.handler));
    });
  }
}
