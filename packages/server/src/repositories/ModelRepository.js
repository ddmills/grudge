import { DB } from 'services/StorageService';
import Logger from 'utilities/Logger';
import cuid from 'cuid';

export default class ModelRepository {
  static async save(model) {
    if (model.id) {
      return DB.table(this.tableName).where('id', model.id).udpate(model.properties).first();
    }

    const id = `${this.constructor.idPrefix}-${cuid()}`;
    await DB.table(this.tableName).insert({
      ...model.properties,
      id,
    });

    return id;
  }

  static async create(properties) {
    const id = await ModelRepository.save(this.constructor.ModelClass.create(properties));

    return ModelRepository.get(id);
  }

  static async get(id) {
    const data = await DB.table(this.tableName).where('id', id).first();

    if (!data) {
      const error = new Error(`Could not find lobby with id ${id}`);

      return Promise.reject(error);
    }

    const model = this.modelClass.create(data);

    return Promise.resolve(model);
  }

  static async list() {
    try {
      const results = await DB.table(this.tableName).select();

      return results.map((result) => this.modelClass.create(result));
    } catch (error) {
      Logger.error(error);
      throw new Error('Database Error');
    }
  }
}
