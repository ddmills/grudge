import { DB } from 'services/StorageService';
import { Context } from '@grudge/domain';
import Logger from 'utilities/Logger';
import autobind from 'autobind-decorator';
import cuid from 'cuid';
import ModelRepository from './ModelRepository';

@autobind
export default class ContextRepository extends ModelRepository {
  static modelClass = Context;

  static tableName = 'contexts';

  static idPrefix = 'ctx';

  static async browse() {
    const query = {
      isPublic: true,
      countdownStartedAt: null,
    };

    return DB.table(this.tableName).whereRaw(`
      state @> '${JSON.stringify(query)}'
    `);
  }

  static async save(context) {
    if (context.id) {
      return this.update(context);
    }

    const id = `${this.idPrefix}-${cuid()}`;

    try {
      const serialized = context.serialize();

      await DB.table(this.tableName).insert({
        createdAt: serialized.createdAt,
        state: JSON.stringify({
          ...serialized,
          id,
        }),
        id,
      });
    } catch (error) {
      Logger.error('Error creating Context', error);

      throw new Error('Context could not be created');
    }

    return id;
  }

  static async create(properties) {
    const context = Context.create(properties);
    const id = await this.save(context);

    return this.get(id);
  }

  static async update(context) {
    try {
      const serialized = context.serialize();

      await DB
        .table(this.tableName)
        .where({ id: serialized.id })
        .update({
          id: serialized.id,
          createdAt: serialized.createdAt,
          state: JSON.stringify(serialized),
        });

      return serialized.id;
    } catch (error) {
      Logger.error('Error updating Context', error);

      throw new Error('Context could not be updated');
    }
  }

  static async get(id) {
    try {
      const data = await DB.table(this.tableName).where('id', id).first();

      if (!data) {
        const error = new Error(`Could not find context with id ${id}`);

        return Promise.reject(error);
      }

      const context = Context.deserialize(data.state);

      return Promise.resolve(context);
    } catch (error) {
      Logger.error('Error retrieving Context', error);

      throw new Error('Context could not be retrieved');
    }
  }
}
