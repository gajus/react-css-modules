import _ from 'lodash';
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
        clonedElement,
        newChildren,
        newProps,
        styleNames;

    if (Object.isFrozen && Object.isFrozen(element)) {
        elementIsFrozen = true;

        // https://github.com/facebook/react/blob/v0.13.3/src/classic/element/ReactElement.js#L131
        element = objectUnfreeze(element);
        element.props = objectUnfreeze(element.props);
    }

    styleNames = parseStyleName(element.props.styleName || '', configuration.allowMultiple);

    if (React.isValidElement(element.props.children)) {
        element.props.children = linkElement(React.Children.only(element.props.children), styles, configuration);
    } else if (_.isArray(element.props.children) || isIterable(element.props.children)) {
        element.props.children = React.Children.map(element.props.children, (node) => {
            if (React.isValidElement(node)) {
                return linkElement(node, styles, configuration);
            } else {
                return node;
            }
        });
    }

    if (styleNames.length) {
        appendClassName = generateAppendClassName(styles, styleNames, configuration.errorWhenNotFound);

        if (element.props.className) {
            appendClassName = element.props.className + ' ' + appendClassName;
        }

        element.props.className = appendClassName;
        element.props.styleName = null;
    }

    if (elementIsFrozen) {
        Object.freeze(element);
        Object.freeze(element.props);
    }

    return element;
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
