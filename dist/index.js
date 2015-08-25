'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodashLangIsArray = require('lodash/lang/isArray');

var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);

var unfreeze = undefined;

/**
 * Naive implementation of a method to unfreeze an object.
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
 * @param {ReactClass} Target
 * @return {ReactClass}
 */

exports['default'] = function (Target, styles) {
    var linkClass = undefined;

    /**
     * @param {ReactElement} element
     * @return {ReactElement}
     */
    linkClass = function (element) {
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
                    return linkClass(node);
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

    return (function (_Target) {
        _inherits(_class, _Target);

        function _class() {
            _classCallCheck(this, _class);

            _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(_class, [{
            key: 'render',
            value: function render() {
                return linkClass(_get(Object.getPrototypeOf(_class.prototype), 'render', this).call(this));
            }
        }]);

        return _class;
    })(Target);
};

module.exports = exports['default'];