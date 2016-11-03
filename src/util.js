export const isObject = (obj) => {
  return obj && typeof obj === 'object';
};
export const isFunction = (fn) => {
  return fn instanceof Function;
};
export const isArray = (arr) => {
  return arr instanceof Array;
};
export const isBoolean = (bool) => {
  return typeof bool === 'boolean';
};

let ref;

if (Object.assign && isFunction(Object.assign)) {
  // If Object.assign exists use it
  ref = Object.assign;
} else {
  // else use Polyfill
  // Based on: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  ref = function (...args) {
    const target = args[0];

    if (target === undefined || target === null) { // eslint-disable-line no-undefined
      throw new TypeError('Cannot convert undefined or null to object');
    }
    const output = Object(target);

    args.slice(1).forEach((src) => {
      if (!isObject(src)) {
        return;
      }
      Object.keys(src)
      .forEach((key) => {
        return src.hasOwnProperty(key) && (output[key] = src[key]);
      });
    });

    return output;
  };
}
const assign = ref;

export {assign};
