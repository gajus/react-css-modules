/* eslint-disable react/prop-types */

import { isObject, assign } from 'lodash';
import React from 'react';
import linkClass from './linkClass';

/**
 * @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 * @param {Function} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {Function}
 */
export default (Component, defaultStyles, options) => {
    let WrappedComponent;

    WrappedComponent = (props = {}, ...args) => {
        let renderResult,
            styles,
            useProps;

        if (props.styles) {
            useProps = props;
            styles = props.styles;
        } else if (isObject(defaultStyles)) {
            useProps = assign({}, props, {
                styles: defaultStyles
            });

            styles = defaultStyles;
        } else {
            useProps = props;
            styles = {};
        }

        renderResult = Component(useProps, ...args);

        if (renderResult) {
            return linkClass(renderResult, styles, options);
        }

        return React.createElement('noscript');
    };

    assign(WrappedComponent, Component);

    return WrappedComponent;
};
