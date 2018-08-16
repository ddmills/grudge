import { action, extendObservable } from 'mobx';
import Cookies from 'utilities/dom/Cookies';

export default class MobXCookie {
  constructor(name, refreshInterval = 5000) {
    this.name = name;

    extendObservable(this, {
      value: Cookies.read(this.name),
    });

    this.interval = setInterval(this.update.bind(this), refreshInterval);
  }

  get() {
    return this.value;
  }

  @action
  remove() {
    Cookies.remove(this.name);
    this.value = undefined;
    clearInterval(this.interval);
  }

  @action
  update() {
    this.value = Cookies.read(this.name);
  }
}
