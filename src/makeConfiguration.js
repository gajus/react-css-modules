/**
 * @typedef CSSModules~Options
 * @see {@link https://github.com/gajus/react-css-modules#options}
 * @property {boolean} allowMultiple
 * @property {boolean} errorWhenNotFound
 */

/**
 * @param {CSSModules~Options} userConfiguration
 * @returns {CSSModules~Options}
 */
export default (userConfiguration = {}) => {
    const configuration = {
        allowMultiple: false,
        errorWhenNotFound: true
    };

    Object.keys(userConfiguration).forEach(name => {
        const value = userConfiguration[name];

        if (!(name in configuration)) {
            throw new Error('Unknown configuration property "' + name + '".');
        }

        if (value !== true && value !== false) {
            throw new Error('"' + name + '" property value must be a boolean.');
        }

        configuration[name] = value;
    });

    return configuration;
};
