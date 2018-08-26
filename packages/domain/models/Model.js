export default class Model {
  constructor(props = {}) {
    Object.assign(this, this.defaults, props);
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
    return new this(overrides);
  }

  clone(overrides = {}) {
    return Model.create({
      ...this.properties,
      ...overrides,
    });
  }
}
