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

    if (props.styles) {
      useProps = props;
      styles = props.styles;
    } else if (_.isObject(defaultStyles)) {
      useProps = _.assign({}, props, {
        styles: defaultStyles
      });

      Object.defineProperty(useProps, 'styles', {
        configurable: true,
        enumerable: false,
        value: defaultStyles,
        writable: false
      });

      styles = defaultStyles;
    } else {
      useProps = props;
      styles = {};
    }

    const renderResult = Component(useProps, ...args);

    if (renderResult) {
      return linkClass(renderResult, styles, props.themes, options);
    }

    return renderNothing(React.version);
  };

  _.assign(WrappedComponent, Component);

  return WrappedComponent;
};
