import SocketEmitter from 'socket.io-emitter';
import RedisClient from 'providers/redis/RedisClient';
import Logger from 'utilities/Logger';

const emitter = SocketEmitter(RedisClient.publisherSingleton);

emitter.redis.on('error', Logger.error);

export default emitter;
