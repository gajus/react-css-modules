import _ from 'lodash';
import React, {
    ReactElement
} from 'react';
import objectUnfreeze from 'object-unfreeze';
import isIterable from './isIterable';
import parseStyleName from './parseStyleName';
import generateAppendClassName from './generateAppendClassName';

const linkArray = (array: Array, styles: Object, configuration: Object) => {
  _.forEach(array, (value, index) => {
    if (React.isValidElement(value)) {
      // eslint-disable-next-line no-use-before-define
      array[index] = linkElement(React.Children.only(value), styles, configuration);
    } else if (_.isArray(value)) {
      array[index] = linkArray(value, styles, configuration);
    }
  });

  return array;
};

const linkElement = (element: ReactElement, styles: Object, configuration: Object): ReactElement => {
  let appendClassName;
  let elementShallowCopy;

  elementShallowCopy = element;

  if (Array.isArray(elementShallowCopy)) {
    return elementShallowCopy.map((arrayElement) => {
      return linkElement(arrayElement, styles, configuration);
    });
  }

  const elementIsFrozen = Object.isFrozen && Object.isFrozen(elementShallowCopy);
  const propsFrozen = Object.isFrozen && Object.isFrozen(elementShallowCopy.props);
  const propsNotExtensible = Object.isExtensible && !Object.isExtensible(elementShallowCopy.props);

  if (elementIsFrozen) {
    // https://github.com/facebook/react/blob/v0.13.3/src/classic/element/ReactElement.js#L131
    elementShallowCopy = objectUnfreeze(elementShallowCopy);
    elementShallowCopy.props = objectUnfreeze(elementShallowCopy.props);
  } else if (propsFrozen || propsNotExtensible) {
    elementShallowCopy.props = objectUnfreeze(elementShallowCopy.props);
  }

  const styleNames = parseStyleName(elementShallowCopy.props.styleName || '', configuration.allowMultiple);
  const {children, ...restProps} = elementShallowCopy.props;

  if (React.isValidElement(children)) {
    elementShallowCopy.props.children = linkElement(React.Children.only(children), styles, configuration);
  } else if (_.isArray(children) || isIterable(children)) {
    elementShallowCopy.props.children = linkArray(objectUnfreeze(children), styles, configuration);
  }

  _.forEach(restProps, (propValue, propName) => {
    if (React.isValidElement(propValue)) {
      elementShallowCopy.props[propName] = linkElement(React.Children.only(propValue), styles, configuration);
    } else if (_.isArray(propValue)) {
      elementShallowCopy.props[propName] = linkArray(propValue, styles, configuration);
    }
  });

  if (styleNames.length) {
    appendClassName = generateAppendClassName(styles, styleNames, configuration.handleNotFoundStyleName);

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
  } else if (propsFrozen) {
    Object.freeze(elementShallowCopy.props);
  }

  if (propsNotExtensible) {
    Object.preventExtensions(elementShallowCopy.props);
  }

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
