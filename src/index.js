import linkClass from './linkClass';
import _ from 'lodash';

let decoratorConstructor,
    functionConstructor;

/**
 * When used as a function.
 *
 * @param {Function} Component
 * @param {Object} defaultStyles CSS Modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {Function}
 */
functionConstructor = (Component, defaultStyles, options) => {
    return class extends Component {
        render () {
            let styles;

            if (this.props.styles) {
                styles = this.props.styles;
            } else if (_.isObject(defaultStyles)) {
                styles = defaultStyles;
            } else {
                styles = {};
            }

            return linkClass(super.render(), styles, options);
        }
    };
};

/**
 * When used as a ES7 decorator.
 *
 * @param {Object} defaultStyles CSS Modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {Function}
 */
decoratorConstructor = (defaultStyles, options) => {
    return (Component) => {
        return functionConstructor(Component, defaultStyles, options);
    };
};

export default (...args) => {
    if (typeof args[0] === 'function') {
        return functionConstructor(args[0], args[1], args[2]);
    } else {
        return decoratorConstructor(args[0], args[1]);
    }
};
