'use strict';

var _lodashLangIsObject2 = require('lodash/lang/isObject');

var _lodashLangIsObject3 = _interopRequireDefault(_lodashLangIsObject2);

var _lodashObjectAssign2 = require('lodash/object/assign');

var _lodashObjectAssign3 = _interopRequireDefault(_lodashObjectAssign2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _linkClass = require('./linkClass');

var _linkClass2 = _interopRequireDefault(_linkClass);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var wrapStatelessFunction = undefined;

/**
 * @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 * @param {function} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {function}
 */
wrapStatelessFunction = function (Component, defaultStyles, options) {
    var WrappedComponent = undefined;

    WrappedComponent = function () {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var renderResult = undefined,
            styles = undefined,
            useProps = undefined;

        if (props.styles) {
            useProps = props;
            styles = props.styles;
        } else if ((0, _lodashLangIsObject3['default'])(defaultStyles)) {
            useProps = (0, _lodashObjectAssign3['default'])({}, props, {
                styles: defaultStyles
            });

            styles = defaultStyles;
        } else {
            useProps = props;
            styles = {};
        }

        renderResult = Component.apply(undefined, [useProps].concat(args));

        if (renderResult) {
            return (0, _linkClass2['default'])(renderResult, styles, options);
        }

        return _react2['default'].createElement('noscript');
    };

    (0, _lodashObjectAssign3['default'])(WrappedComponent, Component);

    return WrappedComponent;
};

exports['default'] = wrapStatelessFunction;
module.exports = exports['default'];