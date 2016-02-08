/* eslint-disable react/prop-types */

import linkClass from './linkClass';
import React from 'react';
import { isObject, assign } from 'lodash';
import hoistNonReactStatics from 'hoist-non-react-statics';

/**
 * @param {ReactClass} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {ReactClass}
 */
export default (Component, defaultStyles, options) => {
    let WrappedComponent;

    WrappedComponent = class extends Component {
        render () {
            let renderResult,
                styles;

            if (this.props.styles) {
                styles = this.props.styles;
            } else if (isObject(defaultStyles)) {
                this.props = assign({}, this.props, {
                    styles: defaultStyles
                });

                styles = defaultStyles;
            } else {
                styles = {};
            }

            renderResult = super.render();

            if (renderResult) {
                return linkClass(renderResult, styles, options);
            }

            return React.createElement('noscript');
        }
    };

    return hoistNonReactStatics(WrappedComponent, Component);
};
