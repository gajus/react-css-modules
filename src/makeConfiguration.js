import _ from 'lodash';
import Map from 'es6-map';
import { globalOptions } from './index';

const userConfigurationIndex = new Map();

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

    configuration = { ...globalOptions };

    _.forEach(userConfiguration, (value, name) => {
        if (_.isUndefined(configuration[name])) {
            throw new Error('Unknown configuration property "' + name + '".');
        }

        if (!_.isBoolean(value)) {
            throw new Error('"' + name + '" property value must be a boolean.');
        }

        configuration[name] = value;
    });

    userConfigurationIndex.set(userConfiguration, configuration);

    return configuration;
};
