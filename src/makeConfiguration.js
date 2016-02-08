import { forEach, isUndefined, isBoolean } from 'lodash';
import Map from 'es6-map';

let userConfigurationIndex;

userConfigurationIndex = new Map();

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
    let configuration;

    configuration = userConfigurationIndex.get(userConfiguration);

    if (configuration) {
        return configuration;
    }

    configuration = {
        allowMultiple: false,
        errorWhenNotFound: true
    };

    forEach(userConfiguration, (value, name) => {
        if (isUndefined(configuration[name])) {
            throw new Error('Unknown configuration property "' + name + '".');
        }

        if (!isBoolean(value)) {
            throw new Error('"' + name + '" property value must be a boolean.');
        }

        configuration[name] = value;
    });

    userConfigurationIndex.set(userConfiguration, configuration);

    return configuration;
};
