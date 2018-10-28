export default class Model {
  constructor(props = {}) {
    Object.assign(this, this.constructor.defaults);
    Object.assign(this, props);
  }

  static get defaults() {
    return Object.entries(this.properties).reduce((o, [k, v]) => ({
      ...o,
      [k]: v.defaultValue,
    }), {});
  }

  static get properties() {
    return {};
  }

  static create(overrides = {}) {
    return new this(overrides);
  }
}
