import _ from 'lodash';
import React, {
    ReactElement
} from 'react';
import makeConfiguration from './makeConfiguration';
import isIterable from './isIterable';
import parseStyleName from './parseStyleName';
import generateAppendClassName from './generateAppendClassName';
import objectUnfreeze from 'object-unfreeze';

const styleProperty = 'data-style';

const linkElement = (element: ReactElement, styles: Object, configuration: Object): ReactElement => {
    let appendClassName,
        elementIsFrozen,
        elementShallowCopy;

    elementShallowCopy = element;

    if (Object.isFrozen && Object.isFrozen(elementShallowCopy)) {
        elementIsFrozen = true;

        // https://github.com/facebook/react/blob/v0.13.3/src/classic/element/ReactElement.js#L131
        elementShallowCopy = objectUnfreeze(elementShallowCopy);
        elementShallowCopy.props = objectUnfreeze(elementShallowCopy.props);
    }

    const styleNames = parseStyleName(elementShallowCopy.props[styleProperty] || '', configuration.allowMultiple);

    if (React.isValidElement(elementShallowCopy.props.children)) {
        elementShallowCopy.props.children = linkElement(React.Children.only(elementShallowCopy.props.children), styles, configuration);
    } else if (_.isArray(elementShallowCopy.props.children) || isIterable(elementShallowCopy.props.children)) {
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
            elementShallowCopy.props[styleProperty] = null;
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
 */
export default (element: ReactElement, styles = {}, userConfiguration): ReactElement => {
    // @see https://github.com/gajus/react-css-modules/pull/30
    if (!_.isObject(element)) {
        return element;
    }

    const configuration = makeConfiguration(userConfiguration);

    return linkElement(element, styles, configuration);
};
