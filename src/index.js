import _ from 'lodash';
import extendReactClass from './extendReactClass';
import wrapStatelessFunction from './wrapStatelessFunction';

/**
 * @see https://github.com/gajus/react-css-modules#options
 */
type OptionsType = {};

export const globalOptions = {
  allowMultiple: false,
  errorWhenNotFound: true
};

/**
 * Determines if the given object has the signature of a class that inherits React.Component.
 */
const isReactComponent = (maybeReactComponent: any): boolean => {
    return 'prototype' in maybeReactComponent && _.isFunction(maybeReactComponent.prototype.render);
};

/**
 * When used as a function.
 */
const functionConstructor = (Component: Function, defaultStyles: Object, options: OptionsType): Function => {
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
 */
const decoratorConstructor = (defaultStyles: Object, options: OptionsType): Function => {
    return (Component: Function) => {
        return functionConstructor(Component, defaultStyles, options);
    };
};

export default (...args) => {
    if (_.isFunction(args[0])) {
        return functionConstructor(args[0], args[1], args[2]);
    } else {
        return decoratorConstructor(args[0], args[1]);
    }
};
