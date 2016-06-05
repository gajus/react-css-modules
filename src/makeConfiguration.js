import _ from 'lodash';

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

    _.forEach(userConfiguration, (value, name) => {
        if (_.isUndefined(configuration[name])) {
            throw new Error('Unknown configuration property "' + name + '".');
        }

        if (!_.isBoolean(value)) {
            throw new Error('"' + name + '" property value must be a boolean.');
        }

        configuration[name] = value;
    });

    return configuration;
};
