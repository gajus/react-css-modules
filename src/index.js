import {isFunction} from './util';
import extendReactClass from './extendReactClass';
import wrapStatelessFunction from './wrapStatelessFunction';
import makeConfiguration from './makeConfiguration';

/**
 * @see https://github.com/gajus/react-css-modules#options
 */
type TypeOptions = {};

/**
 * Determines if the given object has the signature of a class that inherits React.Component.
 */
const isReactComponent = (maybeReactComponent: any): boolean => {
  return 'prototype' in maybeReactComponent && isFunction(maybeReactComponent.prototype.render);
};

/**
 * When used as a function.
 */
const functionConstructor = (Component: Function, defaultStyles: Object, options: TypeOptions): Function => {
  let decoratedClass;

  const configuration = makeConfiguration(options);

  if (isReactComponent(Component)) {
    decoratedClass = extendReactClass(Component, defaultStyles, configuration);
  } else {
    decoratedClass = wrapStatelessFunction(Component, defaultStyles, configuration);
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
const decoratorConstructor = (defaultStyles: Object, options: TypeOptions): Function => {
  return (Component: Function) => {
    return functionConstructor(Component, defaultStyles, options);
  };
};

export default (...args) => {
  if (isFunction(args[0])) {
    return functionConstructor(args[0], args[1], args[2]);
  } else {
    return decoratorConstructor(args[0], args[1]);
  }
};
