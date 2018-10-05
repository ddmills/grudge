import autobind from 'autobind-decorator';
import { ActionIds } from '@grudge/data';
import sdk from '@grudge/sdk';

@autobind
export default class ActionStore {
  perform(action, card) { // eslint-disable-line class-methods-use-this
    return sdk.performAction(action, card.id);
  }

  defaultHandAction(card) {
    return this.perform(card.defaultHandAction, card);
  }
}
