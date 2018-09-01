import Redis from 'ioredis';
import config from 'config';

const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
});

export async function put(key, data) {
  const json = JSON.stringify(data);

  redis.set(key, json);

  return Promise.resolve(data);
}

export async function get(key) {
  return new Promise((resolve, reject) => {
    redis.get(key, ((error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data));
      }
    }));
  });
}
