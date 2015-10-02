import linkClass from './linkClass';
import React from 'react';
import _ from 'lodash';

let wrapStatelessFunction;

wrapStatelessFunction = (Component, defaultStyles, options) => {
    return (props, ...args) => {
        let renderResult,
            styles;

        if (props.styles) {
            styles = props.styles;
        } else if (_.isObject(defaultStyles)) {
            styles = defaultStyles;
        } else {
            styles = {};
        }

        renderResult = Component(props, ...args);

        if (renderResult) {
            return linkClass(renderResult, styles, options);
        }

        return React.createElement('noscript');
    };
};

export default wrapStatelessFunction;
