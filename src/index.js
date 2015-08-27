import linkClass from './linkClass';
import makeConfig from './makeConfig';

let decoratorConstructor,
    functionConstructor;

/**
 * When used as a function.
 *
 * @param {Function} Component
 * @param {Object} styles CSS Modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {Function}
 */
functionConstructor = (Component, styles, options = {}) => {
    return class extends Component {
        render () {
            return linkClass(super.render(), styles, makeConfig(options));
        }
    };
};

/**
 * When used as a ES7 decorator.
 *
 * @param {Object} styles CSS Modules class map.
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
