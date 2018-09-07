import Logger from 'utilities/Logger';

export default function createMiddleware() {
  return (socket, nextIO) => {
    socket.use((packet, next) => {
      Logger.info('query', packet[0], packet[1]);

      next();
    });
    nextIO();
  };
}
