import { DB } from 'services/StorageService';
import Logger from 'utilities/Logger';
import autobind from 'autobind-decorator';
import cuid from 'cuid';

@autobind
export default class ModelRepository {
  static serializeProperty(property) {
    if (property instanceof Array || property instanceof Object) {
      return JSON.stringify(property);
    }

    return property;
  }

  static serialzeProperties(properties) {
    return Object.entries(properties).reduce((ob, [k, v]) => ({
      ...ob,
      [k]: this.serializeProperty(v),
    }), {});
  }

  static async updateForId(id, properties) {
    try {
      await DB
        .table(this.tableName)
        .where({ id })
        .update(this.serialzeProperties(properties));

      return id;
    } catch (error) {
      this.throwSafeDatabaseError(error);
    }
  }

  static async save(model) {
    if (model.id) {
      return this.updateForId(model.id, this.serialzeProperties(model.properties));
    }

    const id = `${this.idPrefix}-${cuid()}`;

    try {
      await DB.table(this.tableName).insert({
        ...this.serialzeProperties(model.properties),
        id,
      });
    } catch (error) {
      this.throwSafeDatabaseError(error);
    }

    return id;
  }

  static async create(properties) {
    try {
      const model = this.modelClass.create(properties);
      const id = await this.save(model);

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

  static async firstOrFail(...args) {
    try {
      const result = await DB.table(this.tableName).where(...args).first();

      if (result) {
        return this.modelClass.create(result);
      }

      throw new Error(`Could not find ${this.modelClass.name.toLowerCase()} with properties ${JSON.stringify(args)}`);
    } catch (error) {
      this.throwSafeDatabaseError(error);
    }
  }

  static async first(...args) {
    try {
      return this.firstOrFail(...args);
    } catch (error) {
      return undefined;
    }
  }

  static throwSafeDatabaseError(error) {
    Logger.error(error);

    throw new Error('A database error occured');
  }
}
