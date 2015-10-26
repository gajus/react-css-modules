import extendReactClass from './extendReactClass';
import wrapStatelessFunction from './wrapStatelessFunction';

let decoratorConstructor,
    functionConstructor,
    isReactComponent;

/**
 * Determines if the given object has the signature of a class that inherits React.Component.
 *
 * @param {*} Component
 * @return {boolean}
 */
isReactComponent = (Component) => {
    return 'prototype' in Component && typeof Component.prototype.render === 'function';
};

/**
 * When used as a function.
 *
 * @param {Function} Component
 * @param {Object} defaultStyles CSS Modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {Function}
 */
functionConstructor = (Component, defaultStyles, options) => {
    let decoratedClass;

    if (isReactComponent(Component)) {
        decoratedClass = extendReactClass(Component, defaultStyles, options);
    } else {
        decoratedClass = wrapStatelessFunction(Component, defaultStyles, options);
    }

    if (Component.displayName) {
        decoratedClass.displayName = Component.displayName;
    } else {
        decoratedClass.displayName = Component.name;
    }

    return decoratedClass;
};

/**
 * When used as a ES7 decorator.
 *
 * @param {Object} defaultStyles CSS Modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {Function}
 */
decoratorConstructor = (defaultStyles, options) => {
    return (Component) => {
        return functionConstructor(Component, defaultStyles, options);
    };
};

export default (...args) => {
    if (typeof args[0] === 'function') {
        return functionConstructor(args[0], args[1], args[2]);
    } else {
        return decoratorConstructor(args[0], args[1]);
    }
};
