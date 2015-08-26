import _ from './utils';

/**
 * @see {@link https://github.com/gajus/react-css-modules#options}
 * @property {Boolean} allowMultiple
 * @property {Boolean} keepOriginal
 * @property {Boolean} errorNotFound
 * @property {Boolean} useModuleNam
 * @return {Object}
 */
export default (userConfig = {}) => {
    let knownProperties,
        unknownProperties;

    knownProperties = [
        'allowMultiple',
        'includeOriginal',
        'errorNotFound',
        'useModuleName'
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
        userConfig.allowMultiple = true;
    }

    if (typeof userConfig.includeOriginal === 'undefined') {
        userConfig.includeOriginal = true;
    }

    if (typeof userConfig.errorNotFound === 'undefined') {
        userConfig.errorNotFound = false;
    }

    if (typeof userConfig.useModuleName === 'undefined') {
        userConfig.useModuleName = false;
    }

    return userConfig;
};
