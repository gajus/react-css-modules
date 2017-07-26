import _ from 'lodash';

/**
 * @typedef CSSModules~Options
 * @see {@link https://github.com/gajus/react-css-modules#options}
 * @property {boolean} allowMultiple
 * @property {string} handleNotFoundStyleName
 */

/**
 * @param {CSSModules~Options} userConfiguration
 * @returns {CSSModules~Options}
 */
export default (userConfiguration = {}) => {
  const configuration = {
    allowMultiple: false,
    handleNotFoundStyleName: 'throw'
  };

  _.forEach(userConfiguration, (value, name) => {
    if (_.isUndefined(configuration[name])) {
      throw new Error('Unknown configuration property "' + name + '".');
    }

    if (name === 'allowMultiple' && !_.isBoolean(value)) {
      throw new Error('"allowMultiple" property value must be a boolean.');
    }

    if (name === 'handleNotFoundStyleName' && !['throw', 'log', 'ignore'].includes(value)) {
      throw new Error('"handleNotFoundStyleName" property value must be "throw", "log" or "ignore".');
    }

    configuration[name] = value;
  });

  return configuration;
};
