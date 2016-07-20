/* eslint-disable react/prop-types */

import isObject from 'lodash/isObject';
import assign from 'lodash/assign';
import React from 'react';
import linkClass from './linkClass';

/**
 * @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
export default (Component: Function, defaultStyles: Object, options: Object): Function => {
    const WrappedComponent = (props = {}, ...args) => {
        let styles,
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

        const renderResult = Component(useProps, ...args);

        if (renderResult) {
            return linkClass(renderResult, styles, options);
        }

        return React.createElement('noscript');
    };

    assign(WrappedComponent, Component);

    return WrappedComponent;
};
