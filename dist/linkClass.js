'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _makeConfiguration = require('./makeConfiguration');

var _makeConfiguration2 = _interopRequireDefault(_makeConfiguration);

var linkClass = undefined;

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} userConfiguration
 * @return {ReactElement}
 */
linkClass = function (element, styles, userConfiguration) {
    if (styles === undefined) styles = {};

    var appendClassName = undefined,
        childrenCount = undefined,
        clonedElement = undefined,
        configuration = undefined,
        newChildren = undefined,
        newProps = undefined,
        styleNames = undefined;

    configuration = (0, _makeConfiguration2['default'])(userConfiguration);

    styleNames = element.props.styleName;

    if (styleNames) {
        styleNames = styleNames.split(' ');

        if (configuration.allowMultiple === false && styleNames.length > 1) {
            throw new Error('ReactElement styleName property defines multiple module names ("' + element.props.styleName + '").');
        }

        appendClassName = styleNames.map(function (styleName) {
            if (styles[styleName]) {
                return styles[styleName];
            } else {
                if (configuration.errorWhenNotFound === true) {
                    throw new Error('"' + styleName + '" CSS module is undefined.');
                }

                return '';
            }
        });

        appendClassName = appendClassName.filter(function (className) {
            return className.length;
        });

        appendClassName = appendClassName.join(' ');
    }

    // A child can be either an array, a sole object or a string.
    // <div>test</div>
    if (typeof element.props.children !== 'string') {
        childrenCount = _react2['default'].Children.count(element.props.children);

        if (childrenCount > 1) {
            newChildren = _react2['default'].Children.map(element.props.children, function (node) {
                if (_react2['default'].isValidElement(node)) {
                    return linkClass(node, styles, configuration);
                } else {
                    return node;
                }
            });
        } else if (childrenCount === 1) {
            newChildren = linkClass(_react2['default'].Children.only(element.props.children), styles, configuration);
        }
    }

    if (appendClassName) {
        if (element.props.className) {
            appendClassName = element.props.className + ' ' + appendClassName;
        }

        newProps = {
            className: appendClassName
        };
    }

    if (newChildren) {
        clonedElement = _react2['default'].cloneElement(element, newProps, newChildren);
    } else {
        clonedElement = _react2['default'].cloneElement(element, newProps);
    }

    return clonedElement;
};

exports['default'] = linkClass;
module.exports = exports['default'];