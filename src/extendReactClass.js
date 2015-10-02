import linkClass from './linkClass';
import React from 'react';
import _ from 'lodash';

let extendReactClass;

extendReactClass = (Component, defaultStyles, options) => {
    return class extends Component {
        render () {
            let renderResult,
                styles;

            if (this.props.styles) {
                styles = this.props.styles;
            } else if (_.isObject(defaultStyles)) {
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
