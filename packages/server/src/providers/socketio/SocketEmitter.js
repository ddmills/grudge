import SocketEmitter from 'socket.io-emitter';
import RedisClient from 'providers/redis/RedisClient';

export default SocketEmitter(RedisClient.publisherSingleton);
