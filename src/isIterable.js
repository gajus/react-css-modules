import { isFunction, isObject } from 'lodash';

let ITERATOR_SYMBOL,
    OLD_ITERATOR_SYMBOL;

ITERATOR_SYMBOL = isFunction(Symbol) && Symbol.iterator;
OLD_ITERATOR_SYMBOL = '@@iterator';

/**
 * @see https://github.com/lodash/lodash/issues/1668
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
 * @param {Object} target
 * @returns {boolean}
 */
export default (target) => {
    let iterator;

    if (!isObject(target)) {
        return false;
    }

    if (ITERATOR_SYMBOL) {
        iterator = target[ITERATOR_SYMBOL];
    } else {
        iterator = target[OLD_ITERATOR_SYMBOL];
    }

    return isFunction(iterator);
};
