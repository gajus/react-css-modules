export const isObject = function (obj) {
    return obj === Object(obj);
};

export const isFunction = function (func) {
    return (
        Object.prototype.toString.call(func) === '[object Function]' ||
        Object.prototype.toString.call(func) === '[object GeneratorFunction]'
    );
};

export const isArray = function (arr) {
    return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]';
};

export const trim = function (str) {
    return String.prototype.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

export const filterForTruthy = function (arr) {
    const results = [];

    for (const key in arr) {
        if (arr[key]) {
            results.push(arr[key]);
        }
    }

    return results;
};
