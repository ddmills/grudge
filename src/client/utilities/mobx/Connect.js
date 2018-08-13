import { inject, observer } from 'mobx-react';

export default function connect(...args) {
  return (Component) => inject(...args)(observer(Component));
}
