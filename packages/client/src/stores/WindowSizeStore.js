import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class WindowSizeStore {
  @observable
  width = 0;

  @observable
  height = 0;

  constructor() {
    this.setSize();
    window.addEventListener('resize', this.setSize);
  }

  @action
  setSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  @computed
  get responsiveCardSize() {
    if (this.width < 360 || this.height < 450) {
      return 'xxs';
    }

    if (this.width < 544 || this.height < 555) {
      return 'xs';
    }

    if (this.width < 768 || this.height < 750) {
      return 'sm';
    }

    return 'md';
  }
}
