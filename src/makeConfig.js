import _ from './utils';

/**
 * @typedef CSSModules~Options
 * @see {@link https://github.com/gajus/react-css-modules#options}
 * @property {Boolean} allowMultiple
 * @property {Boolean} errorWhenNotFound
 */

/**
 * @param {Options} userConfig
 * @return {CSSModules~Options}
 */
export default (userConfig = {}) => {
    let knownProperties,
        unknownProperties;

    knownProperties = [
        'allowMultiple',
        'errorWhenNotFound'
    ];

    unknownProperties = _.difference(_.keys(userConfig), knownProperties);

    if (unknownProperties.length) {
        throw new Error(`Unknown config property "${unknownProperties[0]}".`);
    }

    _.forEach(userConfig, (value, name) => {
        if (typeof value !== 'boolean') {
            throw new Error(`"${name}" property value must be a boolean.`);
        }
    });

    if (typeof userConfig.allowMultiple === 'undefined') {
        userConfig.allowMultiple = false;
    }

    if (typeof userConfig.errorWhenNotFound === 'undefined') {
        userConfig.errorWhenNotFound = true;
    }

    return userConfig;
};
