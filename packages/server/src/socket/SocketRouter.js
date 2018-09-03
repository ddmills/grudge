import * as Events from '@grudge/api-events';
import Logger from 'utilities/Logger';
import UserController from './controllers/UserController';
import LobbyController from './controllers/LobbyController';

const eventMap = [{
  event: Events.USER_GET,
  handler: UserController.get,
}, {
  event: Events.USER_LOBBY_GET,
  handler: UserController.getLobbyForUser,
}, {
  event: Events.LOBBY_GET,
  handler: LobbyController.get,
}, {
  event: Events.LOBBY_USERS_GET,
  handler: LobbyController.getUsersInLobby,
}, {
  event: Events.LOBBY_CREATE,
  handler: LobbyController.create,
}, {
  event: Events.LOBBY_COUNTDOWN_START,
  handler: LobbyController.startCountdown,
}, {
  event: Events.LOBBY_LIST,
  handler: LobbyController.list,
}, {
  event: Events.LOBBY_JOIN,
  handler: LobbyController.join,
}, {
  event: Events.LOBBY_LEAVE,
  handler: LobbyController.leave,
}];

export default class SocketRouter {
  static wrapResponse(handler, socket) {
    return async (params, callback) => {
      try {
        const result = await handler(params, socket);

        callback(null, result);
      } catch (error) {
        Logger.error(error);

        callback(error.message);
      }
    };
  }

  static attachListeners(socket) {
    eventMap.forEach((mapping) => {
      socket.on(mapping.event, SocketRouter.wrapResponse(mapping.handler, socket));
    });
  }
}
