'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _extendReactClass = require('./extendReactClass');

var _extendReactClass2 = _interopRequireDefault(_extendReactClass);

var _wrapStatelessFunction = require('./wrapStatelessFunction');

var _wrapStatelessFunction2 = _interopRequireDefault(_wrapStatelessFunction);

var decoratorConstructor = undefined,
    functionConstructor = undefined,
    isReactComponent = undefined;

/**
 * Determines if the given object has the signature of a class that inherits React.Component.
 *
 * @param {*} Component
 * @return {Boolean}
 */
isReactComponent = function (Component) {
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
functionConstructor = function (Component, defaultStyles, options) {
    var decoratedClass = undefined;

    if (isReactComponent(Component)) {
        decoratedClass = (0, _extendReactClass2['default'])(Component, defaultStyles, options);
    } else {
        decoratedClass = (0, _wrapStatelessFunction2['default'])(Component, defaultStyles, options);
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
decoratorConstructor = function (defaultStyles, options) {
    return function (Component) {
        return functionConstructor(Component, defaultStyles, options);
    };
};

exports['default'] = function () {
    if (typeof arguments[0] === 'function') {
        return functionConstructor(arguments[0], arguments[1], arguments[2]);
    } else {
        return decoratorConstructor(arguments[0], arguments[1]);
    }
};

module.exports = exports['default'];