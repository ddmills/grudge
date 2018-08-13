import createRouter from 'router5';
import browserPlugin from 'router5/plugins/browser';

function mobxPlugin(routes, store) {
  const mobxPluginFactory = () => ({
    onTransitionSuccess(nextState) {
      store.activateRoute(nextState.name, nextState.params);
    },
  });

  mobxPluginFactory.pluginName = 'MOBX_PLUGIN';

  return mobxPluginFactory;
}

export default function create(routes, store) {
  const router = createRouter(Object.values(routes));

  router.usePlugin(browserPlugin());
  router.usePlugin(mobxPlugin(routes, store));

  router.start();

  return router;
}
