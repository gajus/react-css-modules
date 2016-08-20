/* eslint-disable react/prop-types */

import React from 'react';
import linkClass from './linkClass';
import {isObject} from './utils';

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
            useProps = Object.assign({}, props, {
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

    Object.assign(WrappedComponent, Component);

    return WrappedComponent;
};
