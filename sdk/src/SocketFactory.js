import io from 'socket.io-client';

export default class SocketFactory {
  static create(token) {
    return io({
      query: {
        token,
      },
    });
  }
}
