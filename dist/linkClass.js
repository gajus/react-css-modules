'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashLangIsArray = require('lodash/lang/isArray');

var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);

var _lodashLangToarray = require('lodash/lang/toarray');

var _lodashLangToarray2 = _interopRequireDefault(_lodashLangToarray);

var linkClass = undefined;

/**
 * @param {ReactElement} element
 * @param {Object} styles
 * @return {ReactElement}
 */
linkClass = function (element) {
    var styles = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var newProps = undefined,
        newClassName = undefined,
        newChildren = undefined,
        childrenCount = undefined;

    if (element.props.className) {
        newClassName = element.props.className.split(' ').map(function (className) {
            if (styles[className]) {
                return className + ' ' + styles[className];
            } else {
                return className;
            }
        }).join(' ');
    }

    childrenCount = _react2['default'].Children.count(element.props.children);

    if (childrenCount > 1) {
        newChildren = [];

        _react2['default'].Children.forEach(element.props.children, function (node) {
            if (_react2['default'].isValidElement(node)) {
                newChildren.push(linkClass(node, styles));
            } else {
                newChildren.push(node);
            }
        });

        // Do not use React.Children.map.
        // For whatever reason React render multiple children as an array, while
        // React.Children.map generates an object.
    } else if (childrenCount === 1) {
            newChildren = linkClass(_react2['default'].Children.only(element.props.children), styles);
        } else {}

    if (newClassName) {
        newProps = {
            className: newClassName
        };
    }

    if (newChildren) {
        element = _react2['default'].cloneElement(element, newProps, newChildren);
    } else {
        element = _react2['default'].cloneElement(element, newProps);
    }

    return element;
};

exports['default'] = linkClass;
module.exports = exports['default'];