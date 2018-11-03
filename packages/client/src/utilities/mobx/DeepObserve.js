import { decorate, observable, action } from 'mobx';
import { allObservable } from 'mobx-decorators';

// const deepObserve = (ob) => {
//   if (Array.isArray(ob)) {
//     return ob.map(deepObserve);
//   }


// };

// export default deepObserve;

// const deepObserve = (ob) => {
//   if (Array.isArray(ob)) {
//     return ob.map(deepObserve);
//   }

//   @allObservable
//   class ObservableClazz extends ob.constructor {}

//   ob.serialize();

//   return new ObservableClazz(ob.constructor.deserialize(ob.serialize()));
// };

// export default deepObserve;

const deepObserve = (instance) => {
  if (instance instanceof Object) {
    const descriptors = Object.getOwnPropertyDescriptors(instance);

    Object.entries(descriptors).forEach(([key, descriptor]) => {
      if (typeof descriptor.value === 'function') {
        // Object.defineProperty(key, action(descriptor.value.bind(instance)));
        decorate(instance, {
          key: action.bound,
        });
      } else if (Array.isArray(descriptor.value)) {
        decorate(instance, {
          [key]: observable,
        });

        descriptor.value.forEach(deepObserve);
      } else if (descriptor.value instanceof Object) {
        decorate(instance, {
          [key]: observable,
        });
        deepObserve(descriptor.value);
      } else if (key !== 'length') {
        decorate(instance, {
          [key]: observable,
        });
      }
    });
  } else if (Array.isArray(instance)) {
    instance.forEach(deepObserve);
  }
};

export default deepObserve;
