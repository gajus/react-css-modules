/* eslint-disable react/prop-types */

import linkClass from './linkClass';
import React from 'react';
import _ from 'lodash';
import hoistNonReactStatics from 'hoist-non-react-statics';

let extendReactClass;

/**
 * @param {ReactClass} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {ReactClass}
 */
extendReactClass = (Component, defaultStyles, options) => {
    let WrappedComponent;

    WrappedComponent = class extends Component {
        render () {
            let renderResult,
                styles;

            /*if (this.props.styles) {
                styles = this.props.styles;
            } else if (_.isObject(defaultStyles)) {
                this.props = _.assign({}, this.props, {
                    styles: defaultStyles
                });

                styles = defaultStyles;
            } else {
                styles = {};
            }

            console.log('styles', styles); */

            styles = defaultStyles;

            renderResult = super.render();

            if (renderResult) {
                return linkClass(renderResult, styles, options);
            }

            return React.createElement('noscript');
        }
    };

    return hoistNonReactStatics(WrappedComponent, Component);
};

export default extendReactClass;
