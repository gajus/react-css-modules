/* eslint-disable react/prop-types */

import linkClass from './linkClass';
import React from 'react';
import _ from 'lodash';

let wrapStatelessFunction;

/**
 * @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 * @param {Function} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {Function}
 */
wrapStatelessFunction = (Component, defaultStyles, options) => {
    let WrappedComponent;

    WrappedComponent = (props = {}, ...args) => {
        let renderResult,
            styles,
            useProps;

        if (props.styles) {
            useProps = props;
            styles = props.styles;
        } else if (_.isObject(defaultStyles)) {
            useProps = _.assign({}, props, {
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

    _.assign(WrappedComponent, Component);

    return WrappedComponent;
};

export default wrapStatelessFunction;
