import { isArray, isObject } from 'lodash';
import React from 'react';
import makeConfiguration from './makeConfiguration';
import isIterable from './isIterable';
import parseStyleName from './parseStyleName';
import generateAppendClassName from './generateAppendClassName';
import objectUnfreeze from 'object-unfreeze';

let linkElement;

linkElement = (element, styles, configuration) => {
    let appendClassName,
        elementIsFrozen,
        elementShallowCopy,
        styleNames;

    elementShallowCopy = element;

    if (Object.isFrozen && Object.isFrozen(elementShallowCopy)) {
        elementIsFrozen = true;

        // https://github.com/facebook/react/blob/v0.13.3/src/classic/element/ReactElement.js#L131
        elementShallowCopy = objectUnfreeze(elementShallowCopy);
        elementShallowCopy.props = objectUnfreeze(elementShallowCopy.props);
    }

    styleNames = parseStyleName(elementShallowCopy.props.styleName || '', configuration.allowMultiple);

    if (React.isValidElement(elementShallowCopy.props.children)) {
        elementShallowCopy.props.children = linkElement(React.Children.only(elementShallowCopy.props.children), styles, configuration);
    } else if (isArray(elementShallowCopy.props.children) || isIterable(elementShallowCopy.props.children)) {
        elementShallowCopy.props.children = React.Children.map(elementShallowCopy.props.children, (node) => {
            if (React.isValidElement(node)) {
                return linkElement(node, styles, configuration);
            } else {
                return node;
            }
        });
    }

    if (styleNames.length) {
        appendClassName = generateAppendClassName(styles, styleNames, configuration.errorWhenNotFound);

        if (appendClassName) {
            if (elementShallowCopy.props.className) {
                appendClassName = elementShallowCopy.props.className + ' ' + appendClassName;
            }

            elementShallowCopy.props.className = appendClassName;
            elementShallowCopy.props.styleName = null;
        }
    }

    if (elementIsFrozen) {
        Object.freeze(elementShallowCopy.props);
        Object.freeze(elementShallowCopy);
    }

    return elementShallowCopy;
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
    if (!isObject(element)) {
        return element;
    }

    configuration = makeConfiguration(userConfiguration);

    return linkElement(element, styles, configuration);
};
