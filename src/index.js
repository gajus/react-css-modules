import linkClass from './linkClass';

/**
 * @param {ReactClass} Target
 * @param {Object} styles
 * @return {ReactClass}
 */
export default (Target, styles) => {
    return class extends Target {
        render () {
            return linkClass(super.render(), styles);
        }
    }
};
