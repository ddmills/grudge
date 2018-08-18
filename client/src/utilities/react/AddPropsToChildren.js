import React from 'react';

export default function addPropsToChildren(children, props) {
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, props);
  });
}
