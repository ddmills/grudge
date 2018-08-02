export default class Model {
  constructor(props = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static get defaults() {
    return {};
  }

  get properties() {
    return Object.keys(this).reduce((props, key) => ({
      ...props,
      [key]: this[key],
    }), {});
  }

  static create(overrides = {}) {
    return new this({
      ...this.defaults,
      ...overrides,
    });
  }

  clone(overrides = {}) {
    return Model.create({
      ...this.properties,
      ...overrides,
    });
  }
}
