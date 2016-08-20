export function isObject(obj) {
    return obj === Object(obj);
}

export function isFunction(func) {
    return (
            Object.prototype.toString.call(func) === '[object Function]'
            || Object.prototype.toString.call(func) === '[object GeneratorFunction]'
        );
}