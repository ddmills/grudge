import { User, Lobby } from '@grudge/domain';
import {
  CONNECTING, CONNECTED, CONNECT_ERROR, CONNECT_TIMEOUT,
  USER_GET, LOBBY_CREATE, LOBBY_GET, LOBBY_LIST, LOBBY_JOIN,
} from '@grudge/api-events';
import SocketFactory from './SocketFactory';
import EventMap from './EventMap';
import EventHook from './EventHook';
import Query from './Query';
import ResponseTransformer from './ResponseTransformer';

export default class SDK {
  constructor() {
    this.eventMap = EventMap.create();
    this.eventMap.forEach((handler) => handler.attach(this));

    this.onConnectingEventHook = new EventHook(CONNECTING, 'onConnecting');
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
        this.socket.once(CONNECTED, () => resolve());
        this.socket.once(CONNECT_ERROR, () => reject(new Error('Socket could not connect')));
        this.socket.once(CONNECT_TIMEOUT, () => reject(new Error('Socket timed out while attempting to connect')));
      });
    }

    if (!this.token) {
      return Promise.reject(new Error('Socket has not been configured yet'));
    }

    return new Promise((resolve, reject) => {
      this.onConnectingEventHook.trigger();
      this.socket = SocketFactory.create(this.token);
      this.socket.once(CONNECTED, () => resolve());
      this.socket.once(CONNECT_ERROR, () => reject(new Error('Socket could not connect')));
      this.socket.once(CONNECT_TIMEOUT, () => reject(new Error('Socket timed out while attempting to connect')));
      this.listen(this.socket);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  query(event, params = {}) {
    return this.connect().then(() => {
      return Query.send(this.socket, event, params);
    });
  }

  getUser(userId) {
    return this.query(USER_GET, { userId }).then(ResponseTransformer.toModel(User));
  }

  getLobby(lobbyId) {
    return this.query(LOBBY_GET, { lobbyId }).then(ResponseTransformer.toModel(Lobby));
  }

  listLobbies() {
    return this.query(LOBBY_LIST).then(ResponseTransformer.toModel(Lobby));
  }

  createLobby(lobbyData) {
    return this.query(LOBBY_CREATE, { lobbyData }).then(ResponseTransformer.toModel(Lobby));
  }

  joinLobby(lobbyId) {
    return this.query(LOBBY_JOIN, { lobbyId }).then(ResponseTransformer.toModel(Lobby));
  }

  listen(socket) {
    this.eventMap.forEach((handler) => handler.listen(socket));
  }
}
