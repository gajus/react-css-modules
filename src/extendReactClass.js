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
      let styles;

      const hasDefaultstyles = _.isObject(defaultStyles);
      
      let renderResult;
      
      if (this.props.styles || hasDefaultstyles) {
        const props = Object.assign({}, this.props);

        if (props.styles) {
          styles = props.styles;
        } else if (hasDefaultstyles) {
          styles = defaultStyles;
          delete props.styles;
        }

        Object.defineProperty(props, 'styles', {
          configurable: true,
          enumerable: false,
          value: styles,
          writable: false
        });
        
        const originalProps = this.props;
        
        let renderIsSuccessful = false;

        try {
          this.props = props;
          
          renderResult = super.render();
          
          renderIsSuccessful = true;
        } finally {
          this.props = originalProps;
        }
        
        // @see https://github.com/facebook/react/issues/14224
        if (!renderIsSuccessful) {
          renderResult = super.render();
        }
      } else {
        styles = {};
        
        renderResult = super.render();
      }

      if (renderResult) {
        return linkClass(renderResult, styles, options);
      }

      return renderNothing(React.version);
    }
  };

  return hoistNonReactStatics(WrappedComponent, Component);
};
