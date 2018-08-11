import { inject, observer } from 'mobx-react';

export default function connect(mapDeps) {
  return (Component) => inject(mapDeps)(observer(Component));
}
