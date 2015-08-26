import linkClass from './linkClass';

/**
 * @param {ReactClass} Component
 * @param {Object} styles CSS modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {ReactClass}
 */
export default (Component, styles, options = {}) => {
    return class extends Component {
        render () {
            if (options.allowMultiple !== false) {
                options.allowMultiple = true;
            }

            if (options.includeOriginal !== false) {
                options.includeOriginal = true;
            }

            return linkClass(super.render(), styles, options);
        }
    }
};
