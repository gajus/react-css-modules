export function isObject(obj) {
    return obj === Object(obj);
}

export function isFunction(func) {
    return (
            Object.prototype.toString.call(func) === '[object Function]'
            || Object.prototype.toString.call(func) === '[object GeneratorFunction]'
        );
}

export function isArray(arr) {
    return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]';
}

export function trim(str) {
    return String.prototype.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

export function filterForTruthy(arr) {
    const results = [];
    for(const key in arr) {
        if(arr[key]) {
            results.push(arr[key]);
        }
    }

    return results;
}
