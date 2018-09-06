import React from 'react';

export default function addPropsToChildren(children, props) {
  return React.Children.map(children, (child) => {
    return child && React.cloneElement(child, props);
  });
}
