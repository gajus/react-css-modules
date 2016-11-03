import {isObject, isFunction} from './util' ;

const ITERATOR_SYMBOL = typeof Symbol !== 'undefined' && isFunction(Symbol) && Symbol.iterator;
const OLD_ITERATOR_SYMBOL = '@@iterator';

/**
 * @see https://github.com/lodash/lodash/issues/1668
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
 */
export default (maybeIterable: any): boolean => {
  let iterator;

  if (!isObject(maybeIterable)) {
    return false;
  }

  if (ITERATOR_SYMBOL) {
    iterator = maybeIterable[ITERATOR_SYMBOL];
  } else {
    iterator = maybeIterable[OLD_ITERATOR_SYMBOL];
  }

  return isFunction(iterator);
};
