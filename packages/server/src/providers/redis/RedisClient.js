import Redis from 'redis';
import config from 'config';

const connect = (overrides = {}) => Redis.createClient({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
  ...overrides,
});

export default class RedisClient {
  static create() {
    return connect();
  }

  static singleton = connect();

  static subscriberSingleton = connect();

  static publisherSingleton = connect({ return_buffers: true });
}
