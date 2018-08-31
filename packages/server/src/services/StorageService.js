import * as redis from 'providers/redis/Redis';

export async function put(key, data) {
  return redis.put(key, data);
}

export async function get(key) {
  return redis.get(key);
}
