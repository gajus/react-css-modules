'use strict';

var _lodashLangIsObject2 = require('lodash/lang/isObject');

var _lodashLangIsObject3 = _interopRequireDefault(_lodashLangIsObject2);

var _lodashObjectAssign2 = require('lodash/object/assign');

var _lodashObjectAssign3 = _interopRequireDefault(_lodashObjectAssign2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _linkClass = require('./linkClass');

var _linkClass2 = _interopRequireDefault(_linkClass);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var extendReactClass = undefined;

/**
 * @param {ReactClass} Component
 * @param {Object} defaultStyles
 * @param {Object} options
 * @returns {ReactClass}
 */
extendReactClass = function (Component, defaultStyles, options) {
    return (function (_Component) {
        _inherits(_class, _Component);

        function _class() {
            _classCallCheck(this, _class);

            _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(_class, [{
            key: 'render',
            value: function render() {
                var renderResult = undefined,
                    styles = undefined;

                if (this.props.styles) {
                    styles = this.props.styles;
                } else if ((0, _lodashLangIsObject3['default'])(defaultStyles)) {
                    this.props = (0, _lodashObjectAssign3['default'])({}, this.props, {
                        styles: defaultStyles
                    });

                    styles = defaultStyles;
                } else {
                    styles = {};
                }

                renderResult = _get(Object.getPrototypeOf(_class.prototype), 'render', this).call(this);

                if (renderResult) {
                    return (0, _linkClass2['default'])(renderResult, styles, options);
                }

                return _react2['default'].createElement('noscript');
            }
        }]);

        return _class;
    })(Component);
};

exports['default'] = extendReactClass;
module.exports = exports['default'];
//# sourceMappingURL=extendReactClass.js.map
