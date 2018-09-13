import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class CardTypeStore {
  @observable cardTypes = [];

  constructor() {
    sdk.onConnected(this.fetchCardTypes);
  }

  @action
  setCardTypes(cardTypes) {
    console.log('setCardTypes', cardTypes);
    this.cardTypes.replace(cardTypes);
  }

  fetchCardTypes() {
    sdk.listCardTypes().then(this.setCardTypes);
  }
}
