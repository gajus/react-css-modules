import _ from 'lodash';
import React, {
    ReactElement
} from 'react';
import objectUnfreeze from 'object-unfreeze';
import isIterable from './isIterable';
import parseStyleName from './parseStyleName';
import generateAppendClassName from './generateAppendClassName';

const linkElement = (element: ReactElement, styles: Object, configuration: Object): ReactElement => {
  let appendClassName,
    elementIsFrozen,
    elementShallowCopy;

  elementShallowCopy = element;

  let children = elementShallowCopy.props.children;
  let className = elementShallowCopy.props.className;

  const styleNames = parseStyleName(elementShallowCopy.props.styleName || '', configuration.allowMultiple);

  if (React.isValidElement(elementShallowCopy.props.children)) {
    children = linkElement(React.Children.only(children), styles, configuration);
  } else if (_.isArray(children) || isIterable(children)) {
    children = React.Children.map(children, (node) => {
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
      if (className) {
        appendClassName = className + ' ' + appendClassName;
      }

      className = appendClassName;
    }
  }

  elementShallowCopy = React.cloneElement(elementShallowCopy, { children, className, styleName: null });

  return elementShallowCopy;
};

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} configuration
 */
export default (element: ReactElement, styles = {}, configuration = {}): ReactElement => {
    // @see https://github.com/gajus/react-css-modules/pull/30
  if (!_.isObject(element)) {
    return element;
  }

  return linkElement(element, styles, configuration);
};
