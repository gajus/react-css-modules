import _ from 'lodash';
import React from 'react';
import makeConfiguration from './makeConfiguration';
import isIterable from './isIterable';
import parseStyleName from './parseStyleName';
import generateAppendClassName from './generateAppendClassName';

let linkElement;

linkElement = (element, styles, configuration) => {
    let appendClassName,
        children,
        clonedElement,
        newChildren,
        newProps,
        styleNames;

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
        newChildren = linkElement(React.Children.only(children), styles, configuration);
    } else if (_.isArray(children) || isIterable(children)) {
        newChildren = React.Children.map(children, (node) => {
            if (React.isValidElement(node)) {
                return linkElement(node, styles, configuration);
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

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} userConfiguration
 * @returns {ReactElement}
 */
export default (element, styles = {}, userConfiguration) => {
    let configuration;

    // @see https://github.com/gajus/react-css-modules/pull/30
    if (!_.isObject(element)) {
        return element;
    }

    configuration = makeConfiguration(userConfiguration);

    return linkElement(element, styles, configuration);
};
