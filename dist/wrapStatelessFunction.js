'use strict';

var _lodashLangIsObject2 = require('lodash/lang/isObject');

var _lodashLangIsObject3 = _interopRequireDefault(_lodashLangIsObject2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _linkClass = require('./linkClass');

var _linkClass2 = _interopRequireDefault(_linkClass);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var wrapStatelessFunction = undefined;

wrapStatelessFunction = function (Component, defaultStyles, options) {
    return function (props) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var renderResult = undefined,
            styles = undefined;

        if (props.styles) {
            styles = props.styles;
        } else if ((0, _lodashLangIsObject3['default'])(defaultStyles)) {
            styles = defaultStyles;
        } else {
            styles = {};
        }

        renderResult = Component.apply(undefined, [props].concat(args));

        if (renderResult) {
            return (0, _linkClass2['default'])(renderResult, styles, options);
        }

        return _react2['default'].createElement('noscript');
    };
};

exports['default'] = wrapStatelessFunction;
module.exports = exports['default'];