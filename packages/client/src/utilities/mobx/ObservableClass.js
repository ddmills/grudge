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

  // decorate(instance, definitions);

  return instance;

  // descriptors.entries(([key, descriptor]) => {
  //   if (typeof descriptor.value === 'function') {
  //     // Function -> Action
  //     // instance[key] = Mobx.action(descriptor.value.bind(instance));
  //     Object.defineProperty(key, Mobx.action(descriptor.value.bind(instance)));
  //   } else {
  //     // Value -> Value, Getter|Setter -> Computed
  //     descriptor.enumerable = true; // extendObservable ignores non-enumerable props
  //     Object.defineProperty(definitions, propName, descriptor);
  //   }
  // });
};


// function Observable(clazz) {
//   const ObservableClass = class extends clazz {
//     constructor(...args) {
//       super(...args);

//       const descriptors = Object.getOwnPropertyDescriptors(this);
//       const definitions = {};

//       for (let propName in descriptors) { // eslint-disable-line
//         const descriptor = descriptors[propName];

//         if (typeof descriptor.value === 'function') {
//           // Function -> Action
//           this[propName] = Mobx.action(descriptor.value.bind(this));
//         } else {
//           // Value -> Value, Getter|Setter -> Computed
//           descriptor.enumerable = true; // extendObservable ignores non-enumerable props
//           Object.defineProperty(definitions, propName, descriptor);
//         }
//       }

//       Mobx.extendObservable(this, definitions);
//     }
//   };

//   // Make prototype observable
//   let descriptors = Object.getOwnPropertyDescriptors(clazz.prototype);
//   for (let propName in descriptors) {
//     if (propName === 'constructor') continue;

//     const descriptor = descriptors[propName];

//     // Function -> Action (bound)
//     if (typeof descriptor.value === 'function') {
//       Object.defineProperty(ObservableClass.prototype, propName, Mobx.action.bound(ObservableClass.prototype, propName, descriptors[propName]));
//       continue;
//     }

//     // Getter -> Computed
//     if (typeof descriptor.get !== 'undefined') {
//       Object.defineProperty(ObservableClass.prototype, propName, Mobx.computed(ObservableClass.prototype, propName, descriptors[propName]));
//       continue;
//     }

//     // Value -> Value
//     Object.defineProperty(ObservableClass.prototype, propName, Mobx.observable(ObservableClass.prototype, propName, descriptors[propName]));
//   }

//   // Static functions -> actions
//   descriptors = Object.getOwnPropertyDescriptors(clazz);
//   for (let propName in descriptors) {
//     if (propName === 'length' || propName === 'name' || propName === 'prototype') continue;

//     const descriptor = descriptors[propName];

//     // Function -> Action
//     if (typeof descriptor.value === 'function') {
//       ObservableClass[propName] = Mobx.action(descriptor.value);
//       continue;
//     }
//   }

//   return ObservableClass;
// }
