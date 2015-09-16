'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _linkClass = require('./linkClass');

var _linkClass2 = _interopRequireDefault(_linkClass);

var decoratorConstructor = undefined,
    functionConstructor = undefined;

/**
 * When used as a function.
 *
 * @param {Function} Component
 * @param {Object} styles CSS Modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {Function}
 */
functionConstructor = function (Component, styles, options) {
    return (function (_Component) {
        _inherits(_class, _Component);

        function _class() {
            _classCallCheck(this, _class);

            _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(_class, [{
            key: 'render',
            value: function render() {
                var customStyles = this.props.styles;

                if (customStyles && typeof customStyles === 'object') {
                    Object.keys(customStyles).forEach(function (key) {
                        if (styles[key]) {
                            var pattern = new RegExp('(^|\\s)' + customStyles[key] + '(\\s|$)');

                            if (!pattern.test(styles[key])) {
                                styles[key] = styles[key] + ' ' + customStyles[key];
                            }
                        } else {
                            styles[key] = customStyles[key];
                        }
                    });
                }
                return (0, _linkClass2['default'])(_get(Object.getPrototypeOf(_class.prototype), 'render', this).call(this), styles, options);
            }
        }]);

        return _class;
    })(Component);
};

/**
 * When used as a ES7 decorator.
 *
 * @param {Object} styles CSS Modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {Function}
 */
decoratorConstructor = function (styles, options) {
    return function (Component) {
        return functionConstructor(Component, styles, options);
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