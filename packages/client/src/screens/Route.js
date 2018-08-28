export default class Route {
  name = 'must override';

  path = 'must-override';

  isExternal = false;

  isAuthRequired = false;

  Component = 'div';

  static createStore() {}

  constructor(stores) {
    this.store = this.constructor.createStore(stores);

    const allStores = { ...stores };

    allStores[this.constructor.storeName] = this.store;

    this.activate = (params) => this.constructor.onActivated(allStores, params);
  }

  static onActivated() {}

  toJSON() {
    return {
      name: this.name,
      path: this.path,
    };
  }
}
