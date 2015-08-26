import linkClass from './linkClass';

let functionConstructor,
    decoratorConstructor;

/**
 * When used as a function.
 *
 * @param {Function} Component
 * @param {Object} styles CSS modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {Function}
 */
functionConstructor = (Component, styles, options = {}) => {
    return class extends Component {
        render () {
            if (options.allowMultiple !== false) {
                options.allowMultiple = true;
            }

            if (options.includeOriginal !== false) {
                options.includeOriginal = true;
            }

            if (options.errorNotFound !== true) {
                options.errorNotFound = false;
            }

            return linkClass(super.render(), styles, options);
        }
    };
};

/**
 * When used as a ES7 decorator.
 *
 * @param {Object} styles CSS modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {Function}
 */
decoratorConstructor = (styles, options) => {
    return (Component) => {
        return functionConstructor(Component, styles, options);
    };
};

export default (...args) => {
    if (typeof args[0] === 'function') {
        return functionConstructor(args[0], args[1], args[2]);
    } else {
        return decoratorConstructor(args[0], args[1]);
    }
};
