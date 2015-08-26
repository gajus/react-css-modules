import linkClass from './linkClass';

/**
 * @param {ReactClass} Target
 * @param {Object} styles {localClassName: 'generatedClassName'}
 * @return {ReactClass}
 */
export default (Target, styles) => {
    return class extends Target {
        render () {
            return linkClass(super.render(), styles);
        }
    }
};
