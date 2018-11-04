export default class Model {
  constructor(props = {}) {
    Object.assign(this, this.constructor.defaults);
    Object.assign(this, props);
  }

  static get defaults() {
    return Object.entries(this.schema).reduce((o, [k, v]) => ({
      ...o,
      [k]: v.defaultValue,
    }), {});
  }

  static get schema() {
    return {};
  }

  get attributes() {
    return Object.keys(this.constructor.schema).reduce((o, k) => ({
      ...o,
      [k]: this[k],
    }), {});
  }

  static create(overrides = {}) {
    return new this(overrides);
  }

  set(key, value) {
    Object.assign(this, {
      [key]: value,
    });
  }

  serialize() {
    return this.attributes;
  }

  static deserialize(data) {
    return this.create(data);
  }

  static serializeAll(datas = []) {
    return datas.map((data) => data.serialize());
  }

  static deserializeAll(datas = []) {
    return datas.map((data) => this.deserialize(data));
  }
}
