export default class Route {
  name = 'must override';

  path = 'must-override';

  isExternal = false;

  isAuthRequired = false;

  Component = 'div';

  static createStore() {}

  constructor(stores) {
    this.store = this.constructor.createStore(stores);
  }

  toJSON() {
    return {
      name: this.name,
      path: this.path,
    };
  }
}
