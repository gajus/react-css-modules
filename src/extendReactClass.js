import linkClass from './linkClass';
import React from 'react';
import isObject from 'lodash/lang/isObject';
import assign from 'lodash/object/assign';

let extendReactClass;

/**
 * @param {ReactClass} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {ReactClass}
 */
extendReactClass = (Component, defaultStyles, options) => {
    return class extends Component {
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
};

export default extendReactClass;
