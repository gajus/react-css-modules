/* eslint-disable react/prop-types */

import _ from 'lodash';
import React from 'react';
import linkClass from './linkClass';
import renderNothing from './renderNothing';

/**
 * @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
export default (Component: Function, defaultStyles: Object, options: Object): Function => {
  const WrappedComponent = (props = {}, ...args) => {
    let styles;
    let useProps;
    const hasDefaultstyles = _.isObject(defaultStyles);

    if (props.styles || hasDefaultstyles) {
      useProps = Object.assign({}, props);

      if (props.styles) {
        styles = props.styles;
      } else {
        styles = defaultStyles;
      }

      Object.defineProperty(useProps, 'styles', {
        configurable: true,
        enumerable: false,
        value: styles,
        writable: false
      });
    } else {
      useProps = props;
      styles = {};
    }

    const renderResult = Component(useProps, ...args);

    if (renderResult) {
      return linkClass(renderResult, styles, options);
    }

    return renderNothing(React.version);
  };

  _.assign(WrappedComponent, Component);

  return WrappedComponent;
};
