/* eslint-disable react/prop-types */

import _ from 'lodash';
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import linkClass from './linkClass';
import renderNothing from './renderNothing';

/**
 * @param {ReactClass} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {ReactClass}
 */
export default (Component: Object, defaultStyles: Object, options: Object) => {
  const WrappedComponent = class extends Component {
    render () {
      let propsChanged;
      let styles;

      propsChanged = false;

      if (this.props.styles) {
        styles = this.props.styles;
      } else if (_.isObject(defaultStyles)) {
        const props = Object.assign({}, this.props);

        Object.defineProperty(props, 'styles', {
          configurable: true,
          enumerable: false,
          value: defaultStyles,
          writable: false
        });

        this.props = props;

        propsChanged = true;
        styles = defaultStyles;
      } else {
        styles = {};
      }

      const renderResult = super.render();

      if (propsChanged) {
        delete this.props.styles;
      }

      if (renderResult) {
        return linkClass(renderResult, styles, this.props.themes, options);
      }

      return renderNothing(React.version);
    }
  };

  return hoistNonReactStatics(WrappedComponent, Component);
};
