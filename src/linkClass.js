import React from 'react';
import isArray from 'lodash/lang/isArray';
import toArray from 'lodash/lang/toarray';

let linkClass;

/**
 * @param {ReactElement} element
 * @param {Object} styles
 * @return {ReactElement}
 */
linkClass = (element, styles = {}) => {
    let newProps,
        newClassName,
        newChildren,
        childrenCount;

    if (element.props.className) {
        newClassName = element.props.className.split(' ').map((className) => {
            if (styles[className]) {
                return `${className} ${styles[className]}`;
            } else {
                return className;
            }
        }).join(' ');
    }

    childrenCount = React.Children.count(element.props.children);

    if (childrenCount > 1) {
        newChildren = [];

        React.Children.forEach(element.props.children, (node) => {
            if (React.isValidElement(node)) {
                newChildren.push(linkClass(node, styles));
            } else {
                newChildren.push(node);
            }
        });

        // Do not use React.Children.map.
        // For whatever reason React render multiple children as an array, while
        // React.Children.map generates an object.

    } else if (childrenCount === 1) {
        newChildren = linkClass(React.Children.only(element.props.children), styles);
    } else {

    }

    if (newClassName) {
        newProps = {
            className: newClassName
        };
    }

    if (newChildren) {
        element = React.cloneElement(element, newProps, newChildren);
    } else {
        element = React.cloneElement(element, newProps);
    }

    return element;
};

export default linkClass;
