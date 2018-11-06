import * as Events from '@grudge/api-events';
import { Model } from '@grudge/domain';
import Logger from 'utilities/Logger';
import UserController from './controllers/UserController';
import LobbyController from './controllers/LobbyController';
import CardTypeController from './controllers/CardTypeController';
import DeckController from './controllers/DeckController';
import TurnController from './controllers/TurnController';
import CardController from './controllers/CardController';
import ActionController from './controllers/ActionController';
import ContextController from './controllers/ContextController';
import ContextRepository from '../repositories/ContextRepository';

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
  event: Events.CONTEXT_JOIN,
  handler: ContextController.join,
}, {
  event: Events.CONTEXT_LEAVE,
  handler: ContextController.leave,
  hydrateContext: true,
}, {
  event: Events.PLAYER_BOT_ADD,
  handler: ContextController.addBotPlayer,
  hydrateContext: true,
}, {
  event: Events.CONTEXT_COUNTDOWN_START,
  handler: ContextController.startCountdown,
  hydrateContext: true,
}, {
  event: Events.CONTEXT_COUNTDOWN_STOP,
  handler: ContextController.stopCountdown,
  hydrateContext: true,
}, {
  event: Events.CONTEXT_TURN_END,
  handler: TurnController.endTurn,
  hydrateContext: true,
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
  static async hydrateParams(mapping, params) {
    if (!mapping.hydrateContext) {
      return params;
    }

    if (!params.user.contextId) {
      throw new Error('User is not in a game');
    }

    const context = await ContextRepository.get(params.user.contextId);

    return {
      ...params,
      context,
    };
  }

  static wrapResponse(mapping, socket) {
    return async (params, callback) => {
      try {
        const hydratedParams = await this.hydrateParams(mapping, params);
        const result = await mapping.handler(hydratedParams, socket);

        if (result instanceof Model) {
          callback(null, result.serialize(params.userId));
        } else if (Array.isArray(result) && result.length > 0) {
          if (result[0] instanceof Model) {
            callback(null, Model.serializeAll(params.userId));
          } else {
            callback(null, result);
          }
        } else {
          callback(null, result);
        }
      } catch (error) {
        Logger.error(error);

        callback(error.message);
      }
    };
  }

  static attachListeners(socket) {
    eventMap.forEach((mapping) => {
      socket.on(mapping.event, SocketRouter.wrapResponse(mapping, socket));
    });
  }
}
