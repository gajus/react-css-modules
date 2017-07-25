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
  const {children, ...restProps} = elementShallowCopy.props;

  if (React.isValidElement(children)) {
    elementShallowCopy.props.children = linkElement(React.Children.only(children), styles, configuration);
  } else if (_.isArray(children) || isIterable(children)) {
    elementShallowCopy.props.children = React.Children.map(children, (node) => {
      if (React.isValidElement(node)) {
        // eslint-disable-next-line no-use-before-define
        return linkElement(React.Children.only(node), styles, configuration);
      } else {
        return node;
      }
    });
  }

  _.forEach(restProps, (propValue, propName) => {
    if (React.isValidElement(propValue)) {
      elementShallowCopy.props[propName] = linkElement(React.Children.only(propValue), styles, configuration);
    } else if (_.isArray(propValue)) {
      elementShallowCopy.props[propName] = _.map(propValue, (node) => {
        if (React.isValidElement(node)) {
          return linkElement(React.Children.only(node), styles, configuration);
        } else if (_.isArray(node)) {
          return linkArray(node, styles, configuration);
        }

        return node;
      });
    }
  });

  if (styleNames.length) {
    appendClassName = generateAppendClassName(styles, styleNames, configuration.errorWhenNotFound, configuration.warningWhenNotFound);

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
export default (element: ReactElement, styles = {}, configuration = {}): ReactElement => {
    // @see https://github.com/gajus/react-css-modules/pull/30
  if (!_.isObject(element)) {
    return element;
  }

  return linkElement(element, styles, configuration);
};
