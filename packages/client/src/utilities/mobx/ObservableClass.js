import { decorate, observable, action } from 'mobx';

export default (instance) => {
  const descriptors = Object.getOwnPropertyDescriptors(instance);

  Object.entries(descriptors).forEach(([key, descriptor]) => {
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(key, action(descriptor.value.bind(instance)));
    } else {
      decorate(instance, {
        [key]: observable,
      });
    }
  });

  return instance;
};
