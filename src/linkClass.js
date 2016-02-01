import _ from 'lodash';
import React from 'react';
import makeConfiguration from './makeConfiguration';
import isIterable from './isIterable';
import parseStyleName from './parseStyleName';
import generateAppendClassName from './generateAppendClassName';

let linkClass;

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} userConfiguration
 * @returns {ReactElement}
 */
linkClass = (element, styles = {}, userConfiguration) => {
    let appendClassName,
        children,
        clonedElement,
        configuration,
        newChildren,
        newProps,
        styleNames;

    // @see https://github.com/gajus/react-css-modules/pull/30
    if (!_.isObject(element)) {
        return element;
    }

    configuration = makeConfiguration(userConfiguration);

    styleNames = parseStyleName(element.props.styleName || '', configuration.allowMultiple);

    if (styleNames.length) {
        appendClassName = generateAppendClassName(styles, styleNames, configuration.errorWhenNotFound);
    }

    // element.props.children can be one of the following:
    // 'text'
    // ['text']
    // [ReactElement, 'text']
    // ReactElement

    children = element.props.children;

    if (React.isValidElement(children)) {
        newChildren = linkClass(React.Children.only(children), styles, configuration);
    } else if (_.isArray(children) || isIterable(children)) {
        /* eslint-disable lodash3/prefer-lodash-method */
        newChildren = React.Children.map(children, (node) => {
        /* eslint-enable lodash3/prefer-lodash-method */
            if (React.isValidElement(node)) {
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
            className: appendClassName,
            styleName: null
        };
    }

    if (newChildren) {
        clonedElement = React.cloneElement(element, newProps, newChildren);
    } else {
        clonedElement = React.cloneElement(element, newProps);
    }

    return clonedElement;
};

export default linkClass;
