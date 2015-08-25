'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashLangIsArray = require('lodash/lang/isArray');

var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);

var linkClass = undefined,
    unfreeze = undefined;

/**
 * Make a shallow copy of the object.
 *
 * @param {Object} source Frozen object.
 * @return {Object}
 */
unfreeze = function (source) {
    var property = undefined,
        target = undefined;

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
linkClass = function (element, styles) {
    var isFrozen = undefined;

    if (Object.isFrozen && Object.isFrozen(element)) {
        isFrozen = true;

        // https://github.com/facebook/react/blob/v0.13.3/src/classic/element/ReactElement.js#L131
        element = unfreeze(element);
        element.props = unfreeze(element.props);
    }

    if (element.props.className) {
        element.props.className = element.props.className.split(' ').map(function (className) {
            if (styles[className]) {
                return className + ' ' + styles[className];
            } else {
                return className;
            }
        }).join(' ');
    }

    if ((0, _lodashLangIsArray2['default'])(element.props.children)) {
        element.props.children = element.props.children.map(function (node) {
            if (_react2['default'].isValidElement(node)) {
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

exports['default'] = linkClass;
module.exports = exports['default'];