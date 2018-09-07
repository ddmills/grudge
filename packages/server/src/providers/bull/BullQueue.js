import config from 'config';
import Queue from 'bull';

export default class BullQueue {
  static create(name) {
    return new Queue(name, {
      redis: {
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
      },
    });
  }
}
