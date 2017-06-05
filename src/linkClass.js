import _ from 'lodash';
import React, {
    ReactElement
} from 'react';
import objectUnfreeze from 'object-unfreeze';
import isIterable from './isIterable';
import parseStyleName from './parseStyleName';
import generateAppendClassName from './generateAppendClassName';

const linkElement = (element: ReactElement, styles: Object, themes: Object, configuration: Object): ReactElement => {
  let appendClassName;
  let elementIsFrozen;
  let elementShallowCopy;

  elementShallowCopy = element;

  if (Object.isFrozen && Object.isFrozen(elementShallowCopy)) {
    elementIsFrozen = true;

        // https://github.com/facebook/react/blob/v0.13.3/src/classic/element/ReactElement.js#L131
    elementShallowCopy = objectUnfreeze(elementShallowCopy);
    elementShallowCopy.props = objectUnfreeze(elementShallowCopy.props);
  }

  const styleNames = parseStyleName(elementShallowCopy.props.styleName || '', configuration.allowMultiple);

  if (React.isValidElement(elementShallowCopy.props.children)) {
    elementShallowCopy.props.children = linkElement(React.Children.only(elementShallowCopy.props.children), styles, themes, configuration);
  } else if (_.isArray(elementShallowCopy.props.children) || isIterable(elementShallowCopy.props.children)) {
    elementShallowCopy.props.children = React.Children.map(elementShallowCopy.props.children, (node) => {
      if (React.isValidElement(node)) {
        return linkElement(node, styles, themes, configuration);
      } else {
        return node;
      }
    });
  }

  if (styleNames.length) {
    appendClassName = generateAppendClassName(styles, themes, styleNames, configuration.errorWhenNotFound);

    if (appendClassName) {
      if (elementShallowCopy.props.className) {
        appendClassName = elementShallowCopy.props.className + ' ' + appendClassName;
      }

      elementShallowCopy.props.className = appendClassName;
    }
  }

  delete elementShallowCopy.props.styleName;

  if (elementIsFrozen) {
    Object.freeze(elementShallowCopy.props);
    Object.freeze(elementShallowCopy);
  }

  return elementShallowCopy;
};

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} configuration
 */
export default (element: ReactElement, styles = {}, themes = {}, configuration = {}): ReactElement => {
    // @see https://github.com/gajus/react-css-modules/pull/30
  if (!_.isObject(element)) {
    return element;
  }

  return linkElement(element, styles, themes, configuration);
};
