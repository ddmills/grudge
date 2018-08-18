import SocketIO from 'socket.io';

export default function createServer(webServer) {
  return SocketIO(webServer);
}
