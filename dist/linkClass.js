'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var linkClass = undefined;

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {ReactElement}
 */
linkClass = function (element) {
    var styles = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var newProps = undefined,
        newClassName = undefined,
        newChildren = undefined,
        childrenCount = undefined;

    if (element.props.className) {
        newClassName = element.props.className.split(' ');

        if (options.allowMultiple === false && newClassName.length > 1) {
            throw new Error('ReactElement defines multiple class names ("' + element.props.className + '") in className declaration.');
        }

        newClassName = newClassName.map(function (className) {
            if (!styles[className] && options.errorNotFound === true) {
                throw new Error('"' + className + '" CSS class name is not found in CSS modules styles.');
            }

            if (options.includeOriginal === false) {
                if (styles[className]) {
                    return styles[className];
                } else {
                    return '';
                }
            } else {
                if (styles[className]) {
                    return className + ' ' + styles[className];
                } else {
                    return className;
                }
            }
        });

        newClassName = newClassName.filter(function (className) {
            return className.length;
        });

        newClassName = newClassName.join(' ');
    }

    // A child can be either an array, a sole object or a string.
    // <div>test</div>
    if (typeof element.props.children !== 'string') {
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

            /* newChildren = React.Children.map((node) => {
                if (React.isValidElement(node)) {
                    return linkClass(node, styles);
                } else {
                    return node;
                }
            }); */
        } else if (childrenCount === 1) {
                newChildren = linkClass(_react2['default'].Children.only(element.props.children), styles);
            }
    }

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