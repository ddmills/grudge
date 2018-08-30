export default class Model {
  constructor(props = {}) {
    Object.assign(this, this.constructor.defaults, props);
    Object.freeze(this);
    Object.keys(this).forEach((key) => {
      Object.freeze(this[key]);
    });
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
