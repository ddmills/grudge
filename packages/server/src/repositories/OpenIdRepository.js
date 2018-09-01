import { OpenId } from '@grudge/domain';
import { DB } from 'services/StorageService';
import cuid from 'cuid';

export default class OpenIdRepository {
  static async save(openId) {
    if (!openId.providerId) {
      const error = new Error('Could not save open id with falsy providerId');

      return Promise.reject(error);
    }

    if (!openId.provider) {
      const error = new Error('Could not save open id with falsy provider');

      return Promise.reject(error);
    }

    let openIdWithId;

    if (openId.id) {
      openIdWithId = openId;
    } else {
      openIdWithId = openId.clone({
        id: `oid-${cuid()}`,
      });
    }

    return DB.table('openids').insert(openIdWithId.properties);
  }

  static async create(properties) {
    const id = await OpenIdRepository.save(OpenId.create(properties));

    return OpenIdRepository.get(id);
  }

  static async get(id) {
    const data = await DB.table('openids').where('id', id).first();

    if (!data) {
      const error = new Error(`Could find openId with id (${id})`);

      return Promise.reject(error);
    }

    const openId = OpenId.create(data);

    return Promise.resolve(openId);
  }

  static async getForProvider(provider, providerId) {
    const data = await DB.table('openids').where({
      provider,
      providerId,
    }).first();

    if (!data) {
      const error = new Error(`Could find open id (${providerId}) for provider (${provider})`);

      return Promise.reject(error);
    }

    const openId = OpenId.create(data);

    return Promise.resolve(openId);
  }

  static async findForProvider(provider, providerId) {
    try {
      const openId = await OpenIdRepository.getForProvider(provider, providerId);

      return Promise.resolve(openId);
    } catch (e) {
      return Promise.resolve();
    }
  }
}
