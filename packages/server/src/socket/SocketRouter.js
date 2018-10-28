import * as Events from '@grudge/api-events';
import Logger from 'utilities/Logger';
import UserController from './controllers/UserController';
import LobbyController from './controllers/LobbyController';
import CardTypeController from './controllers/CardTypeController';
import DeckController from './controllers/DeckController';
import TurnController from './controllers/TurnController';
import CardController from './controllers/CardController';
import ActionController from './controllers/ActionController';
import ContextController from './controllers/ContextController';

const eventMap = [{
  event: Events.USER_GET,
  handler: UserController.get,
}, {
  event: Events.USER_LOBBY_GET,
  handler: UserController.getLobbyForUser,
}, {
  event: Events.LOBBY_USERS_GET,
  handler: UserController.getUsersInLobby,
}, {
  event: Events.LOBBY_GET,
  handler: LobbyController.get,
}, {
  event: Events.LOBBY_CREATE,
  handler: LobbyController.create,
}, {
  event: Events.LOBBY_COUNTDOWN_START,
  handler: LobbyController.startCountdown,
}, {
  event: Events.LOBBY_COUNTDOWN_STOP,
  handler: LobbyController.stopCountdown,
}, {
  event: Events.LOBBY_LIST,
  handler: LobbyController.list,
}, {
  event: Events.CONTEXT_LIST,
  handler: ContextController.list,
}, {
  event: Events.CONTEXT_CREATE,
  handler: ContextController.create,
}, {
  event: Events.LOBBY_TURN_END,
  handler: TurnController.endTurn,
}, {
  event: Events.CARDTYPE_LIST,
  handler: CardTypeController.list,
}, {
  event: Events.LOBBY_JOIN,
  handler: LobbyController.join,
}, {
  event: Events.LOBBY_LEAVE,
  handler: LobbyController.leave,
}, {
  event: Events.HAND_GET,
  handler: DeckController.getHand,
}, {
  event: Events.ACTION_PERFORM,
  handler: ActionController.performAction,
}, {
  event: Events.CARD_PLAYED_LIST,
  handler: CardController.getPlayedCardsForUser,
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
