import * as redis from 'providers/redis/RedisClient';
import postgres from 'providers/postgres/PostgresClient';

export async function put(key, data) {
  return redis.put(key, data);
}

export async function get(key) {
  return redis.get(key);
}

export const DB = {
  table: (...tableNames) => postgres(...tableNames),
};
