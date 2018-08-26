import { action, extendObservable } from 'mobx';
import Cookies from 'utilities/dom/Cookies';

export default class MobXCookie {
  constructor(name, refreshInterval = 2000) {
    this.name = name;

    extendObservable(this, {
      value: Cookies.read(this.name),
    });

    this.interval = setInterval(this.refresh.bind(this), refreshInterval);
  }

  get() {
    return this.value;
  }

  @action
  remove() {
    Cookies.remove(this.name);
    this.value = undefined;
  }

  @action
  destroy() {
    this.remove();
    clearInterval(this.interval);
  }

  @action
  refresh() {
    this.value = Cookies.read(this.name);
  }
}
