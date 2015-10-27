import forEach from 'lodash/collection/forEach';

/**
 * @typedef CSSModules~Options
 * @see {@link https://github.com/gajus/react-css-modules#options}
 * @property {boolean} allowMultiple
 * @property {boolean} errorWhenNotFound
 */

/**
 * @param {CSSModules~Options} userConfiguration
 * @return {CSSModules~Options}
 */
export default (userConfiguration = {}) => {
    let configuration;

    configuration = {
        allowMultiple: false,
        errorWhenNotFound: true
    };

    forEach(userConfiguration, (value, name) => {
        if (typeof configuration[name] === 'undefined') {
            throw new Error(`Unknown configuration property "${name}".`);
        }

        if (typeof value !== 'boolean') {
            throw new Error(`"${name}" property value must be a boolean.`);
        }

        configuration[name] = value;
    });

    return configuration;
};
