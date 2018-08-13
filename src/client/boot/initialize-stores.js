import RouterStore from 'stores/RouterStore';

export default function initialize() {
  return {
    routerStore: new RouterStore(),
  };
}
