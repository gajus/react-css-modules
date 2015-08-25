import React from 'react';
import isArray from 'lodash/lang/isArray';
import _ from 'lodash';

let linkClass;

/**
 * @param {ReactElement} element
 * @param {Object} styles
 * @return {ReactElement}
 */
linkClass = (element, styles) => {
    let newClassName,
        newChildren;

    if (element.props.className) {
        newClassName = element.props.className.split(' ').map((className) => {
            if (styles[className]) {
                return `${className} ${styles[className]}`;
            } else {
                return className;
            }
        }).join(' ');
    }

    if (isArray(element.props.children)) {
        newChildren = React.Children.map(element.props.children, (node) => {
            if (React.isValidElement(node)) {
                return linkClass(node, styles);
            } else {
                return node;
            }
        });
    } else {
        newChildren = element.props.children;
    }

    return React.cloneElement(element, {
        className: newClassName
    }, newChildren);
};

export default linkClass;
