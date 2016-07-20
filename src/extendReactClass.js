/* eslint-disable react/prop-types */

import React from 'react';
import assign from 'lodash/assign';
import isObject from 'lodash/isObject';
import hoistNonReactStatics from 'hoist-non-react-statics';
import linkClass from './linkClass';

/**
 * @param {ReactClass} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {ReactClass}
 */
export default (Component: Object, defaultStyles: Object, options: Object) => {
    const WrappedComponent = class extends Component {
        render () {
            let propsChanged,
                styles;

            propsChanged = false;

            if (this.props.styles) {
                styles = this.props.styles;
            } else if (isObject(defaultStyles)) {
                this.props = assign({}, this.props, {
                    styles: defaultStyles
                });

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
                return linkClass(renderResult, styles, options);
            }

            return React.createElement('noscript');
        }
    };

    return hoistNonReactStatics(WrappedComponent, Component);
};
