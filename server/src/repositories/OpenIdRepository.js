import { OpenId } from '@grudge/domain';

const providers = {};

export async function save(openId) {
  if (!openId.id) {
    const error = new Error('Could not save open id with falsy id');

    return Promise.reject(error);
  }

  if (!openId.provider) {
    const error = new Error('Could not save open id with falsy provider');

    return Promise.reject(error);
  }

  providers[openId.provider] = {
    ...openId.provider,
    [openId.id]: openId.properties,
  };

  return Promise.resolve(openId);
}

export async function create(properties) {
  return save(OpenId.create(properties));
}

export async function get(provider, id) {
  if (!(provider in providers)) {
    const error = new Error(`Could not find open id provider (${provider})`);

    return Promise.reject(error);
  }

  if (!(id in providers[provider])) {
    const error = new Error(`Could find open id (${id}) for provider (${provider})`);

    return Promise.reject(error);
  }

  const openId = OpenId.create(providers[provider][id]);

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
