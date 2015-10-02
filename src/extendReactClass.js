import linkClass from './linkClass';
import React from 'react';
import _ from 'lodash';

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
            } else if (_.isObject(defaultStyles)) {
                this.props = _.assign({}, this.props, {
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
