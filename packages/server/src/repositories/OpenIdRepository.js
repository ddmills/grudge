import ModelRepository from 'repositories/ModelRepository';
import { OpenId } from '@grudge/domain';
import { DB } from 'services/StorageService';

export default class OpenIdRepository extends ModelRepository {
  static modelClass = OpenId;

  static tableName = 'openids';

  static idPrefix = 'oid';

  static async getForProvider(provider, providerId) {
    const data = await DB.table(this.tableName).where({
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
