import React from 'react';
import isArray from 'lodash/lang/isArray';

let linkClass,
    unfreeze;

/**
 * Make a shallow copy of the object.
 *
 * @param {Object} source Frozen object.
 * @return {Object}
 */
unfreeze = (source) => {
    let property,
        target;

    target = {};

    for (property in source) {
        target[property] = source[property];
    }

    return target;
};

/**
 * @param {ReactElement} element
 * @param {Object} styles
 * @return {ReactElement}
 */
linkClass = (element, styles) => {
    let isFrozen;

    if (Object.isFrozen && Object.isFrozen(element)) {
        isFrozen = true;

        // https://github.com/facebook/react/blob/v0.13.3/src/classic/element/ReactElement.js#L131
        element = unfreeze(element);
        element.props = unfreeze(element.props);
    }

    if (element.props.className) {
        element.props.className = element.props.className.split(' ').map((className) => {
            if (styles[className]) {
                return `${className} ${styles[className]}`;
            } else {
                return className;
            }
        }).join(' ');
    }

    if (isArray(element.props.children)) {
        element.props.children = element.props.children.map((node) => {
            if (React.isValidElement(node)) {
                return linkClass(node, styles);
            } else {
                return node;
            }
        });
    }

    if (isFrozen) {
        Object.freeze(element);
        Object.freeze(element.props);
    }

    return element;
};

export default linkClass;
