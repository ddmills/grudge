import { DB } from 'services/StorageService';
import Logger from 'utilities/Logger';
import autobind from 'autobind-decorator';
import cuid from 'cuid';

@autobind
export default class ModelRepository {
  static async save(model) {
    if (model.id) {
      try {
        await DB
          .table(this.tableName)
          .where({ id: model.id })
          .update(model.properties);

        return model.id;
      } catch (error) {
        this.throwSafeDatabaseError(error);
      }
    }

    const id = `${this.idPrefix}-${cuid()}`;

    try {
      await DB.table(this.tableName).insert({
        ...model.properties,
        id,
      });
    } catch (error) {
      this.throwSafeDatabaseError(error);
    }

    return id;
  }

  static async create(properties) {
    try {
      const id = await this.save(this.modelClass.create(properties));

      return this.get(id);
    } catch (error) {
      this.throwSafeDatabaseError(error);
    }
  }

  static async get(id) {
    try {
      const data = await DB.table(this.tableName).where('id', id).first();

      if (!data) {
        const error = new Error(`Could not find ${this.modelClass.name.toLowerCase()} with id ${id}`);

        return Promise.reject(error);
      }

      const model = this.modelClass.create(data);

      return Promise.resolve(model);
    } catch (error) {
      this.throwSafeDatabaseError(error);
    }
  }

  static async list() {
    try {
      const results = await DB.table(this.tableName).select();

      return results.map((result) => this.modelClass.create(result));
    } catch (error) {
      this.throwSafeDatabaseError(error);
    }
  }

  static async where(...args) {
    try {
      const results = await DB.table(this.tableName).where(...args).select();

      return results.map((result) => this.modelClass.create(result));
    } catch (error) {
      this.throwSafeDatabaseError(error);
    }
  }

  static async first(...args) {
    try {
      const result = await DB.table(this.tableName).where(...args).first();

      return this.modelClass.create(result);
    } catch (error) {
      this.throwSafeDatabaseError(error);
    }
  }

  static throwSafeDatabaseError(error) {
    Logger.error(error);

    throw new Error('A database error occured');
  }
}
