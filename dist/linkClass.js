'use strict';

var _lodashLangIsArray2 = require('lodash/lang/isArray');

var _lodashLangIsArray3 = _interopRequireDefault(_lodashLangIsArray2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _makeConfiguration = require('./makeConfiguration');

var _makeConfiguration2 = _interopRequireDefault(_makeConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

    // element.props.children can be one of the following:
    // 'text'
    // ['text']
    // [ReactElement, 'text']
    // ReactElement

    // console.log(`element.props.children`, element.props.children, `React.Children.count(element.props.children)`, React.Children.count(element.props.children));

    if (_react2['default'].isValidElement(element.props.children)) {
        newChildren = linkClass(_react2['default'].Children.only(element.props.children), styles, configuration);
    } else if ((0, _lodashLangIsArray3['default'])(element.props.children)) {
        newChildren = _react2['default'].Children.map(element.props.children, function (node) {
            if (_react2['default'].isValidElement(node)) {
                return linkClass(node, styles, configuration);
            } else {
                return node;
            }
        });

        // https://github.com/facebook/react/issues/4723#issuecomment-135555277
        // Forcing children into an array produces the following error:
        // Warning: A ReactFragment is an opaque type. Accessing any of its properties is deprecated. Pass it to one of the React.Children helpers.
        // newChildren = _.values(newChildren);
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