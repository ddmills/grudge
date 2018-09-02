import { CONNECTION } from 'socket/SocketEvents';
import SocketAuthMiddleware from 'socket/middleware/SocketAuthMiddleware';
import UserMiddleware from 'socket/middleware/UserMiddleware';
import LoggingMiddleware from 'socket/middleware/LoggingMiddleware';
import SubscriberMiddleware from 'socket/middleware/SubscriberMiddleware';
import RedisClient from 'providers/redis/RedisClient';
import RedisAdapter from 'socket.io-redis';
import SocketRouter from './SocketRouter';

export default function createApp(io) {
  io.use(LoggingMiddleware());
  io.use(SocketAuthMiddleware());
  io.use(UserMiddleware());
  io.use(SubscriberMiddleware());

  io.adapter(RedisAdapter({
    pubClient: RedisClient.publisherSingleton,
    subClient: RedisClient.subscriberSingleton,
  }));

  io.on(CONNECTION, (socket) => SocketRouter.attachListeners(socket));
}
