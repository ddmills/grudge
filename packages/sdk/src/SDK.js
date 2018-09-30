import {
  Card, CardType, User, Lobby,
} from '@grudge/domain';
import * as Events from '@grudge/api-events';
import SocketFactory from './SocketFactory';
import EventMap from './EventMap';
import EventHook from './EventHook';
import Query from './Query';
import ResponseTransformer from './ResponseTransformer';

export default class SDK {
  constructor() {
    this.eventMap = EventMap.create();
    this.eventMap.forEach((handler) => handler.attach(this));

    this.onConnectingEventHook = new EventHook(Events.CONNECTING, 'onConnecting');
    this.onConnectingEventHook.attach(this);
  }

  configure(token) {
    this.token = token;
  }

  connect() {
    if (this.socket) {
      if (this.socket.connected) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        this.socket.once(Events.CONNECTED, () => resolve());
        this.socket.once(Events.CONNECT_ERROR, () => reject(new Error('Socket could not connect')));
        this.socket.once(Events.CONNECT_TIMEOUT, () => reject(new Error('Socket timed out while attempting to connect')));
      });
    }

    if (!this.token) {
      return Promise.reject(new Error('Socket has not been configured yet'));
    }

    return new Promise((resolve, reject) => {
      this.onConnectingEventHook.trigger();
      this.socket = SocketFactory.create(this.token);
      this.socket.once(Events.CONNECTED, () => resolve());
      this.socket.once(Events.CONNECT_ERROR, () => reject(new Error('Socket could not connect')));
      this.socket.once(Events.CONNECT_TIMEOUT, () => reject(new Error('Socket timed out while attempting to connect')));
      this.listen(this.socket);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  listen(socket) {
    this.eventMap.forEach((handler) => handler.listen(socket));
  }

  query(event, params = {}) {
    return this.connect().then(() => {
      return Query.send(this.socket, event, params);
    });
  }

  getUser(userId) {
    return this.query(Events.USER_GET, { userId }).then(ResponseTransformer.toModel(User));
  }

  getLobbyForUser(userId) {
    return this.query(Events.USER_LOBBY_GET, { userId }).then(ResponseTransformer.toModel(Lobby));
  }

  getLobby(lobbyId) {
    return this.query(Events.LOBBY_GET, { lobbyId }).then(ResponseTransformer.toModel(Lobby));
  }

  getUsersInLobby(lobbyId) {
    return this.query(Events.LOBBY_USERS_GET, { lobbyId }).then(ResponseTransformer.toModel(User));
  }

  listLobbies() {
    return this.query(Events.LOBBY_LIST).then(ResponseTransformer.toModel(Lobby));
  }

  createLobby() {
    return this.query(Events.LOBBY_CREATE).then(ResponseTransformer.toModel(Lobby));
  }

  startLobbyCountdown() {
    return this.query(Events.LOBBY_COUNTDOWN_START);
  }

  stopLobbyCountdown() {
    return this.query(Events.LOBBY_COUNTDOWN_STOP);
  }

  joinLobby(lobbyId) {
    return this.query(Events.LOBBY_JOIN, { lobbyId }).then(ResponseTransformer.toModel(Lobby));
  }

  endTurn() {
    return this.query(Events.LOBBY_TURN_END).then(ResponseTransformer.toModel(Lobby));
  }

  getHand() {
    return this.query(Events.HAND_GET).then(ResponseTransformer.toModel(Card));
  }

  leaveLobby() {
    return this.query(Events.LOBBY_LEAVE);
  }

  listCardTypes() {
    return this.query(Events.CARDTYPE_LIST).then(ResponseTransformer.toModel(CardType));
  }

  playCard(cardId) {
    return this.query(Events.CARD_PLAY, { cardId }).then(ResponseTransformer.toModel(Card));
  }
}
