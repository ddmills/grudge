import CounterStore from 'stores/CounterStore';
import RouterStore from '../routing/RouterStore';

export default function initialize() {
  return {
    counterStore: new CounterStore(),
    routerStore: new RouterStore(),
  };
}
