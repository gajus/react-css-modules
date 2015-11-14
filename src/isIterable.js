import { isObject } from 'lodash';

const ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
const OLD_ITERATOR_SYMBOL = '@@iterator';

export default function isIterable(obj) {
  return isObject(obj) &&
    typeof ((ITERATOR_SYMBOL && obj[ITERATOR_SYMBOL])
        || obj[OLD_ITERATOR_SYMBOL]) === 'function';
}
