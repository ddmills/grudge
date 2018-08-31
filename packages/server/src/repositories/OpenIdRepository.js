import { OpenId } from '@grudge/domain';
import * as StorageService from 'services/StorageService';

export async function save(openId) {
  if (!openId.id) {
    const error = new Error('Could not save open id with falsy id');

    return Promise.reject(error);
  }

  if (!openId.provider) {
    const error = new Error('Could not save open id with falsy provider');

    return Promise.reject(error);
  }

  const key = `openid:${openId.provider}:${openId}`;

  return StorageService.put(key, openId.properties);
}

export async function create(properties) {
  return save(OpenId.create(properties));
}

export async function get(provider, id) {
  const key = `openid:${provider}:${id}`;

  const data = await StorageService.get(key);

  if (!data) {
    const error = new Error(`Could find open id (${id}) for provider (${provider})`);

    return Promise.reject(error);
  }

  const openId = OpenId.create(data);

  return Promise.resolve(openId);
}

export async function find(provider, id) {
  try {
    const openId = await get(provider, id);

    return Promise.resolve(openId);
  } catch (e) {
    return Promise.resolve();
  }
}
