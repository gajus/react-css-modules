'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

/**
 * @see {@link https://github.com/gajus/react-css-modules#options}
 * @property {Boolean} allowMultiple
 * @property {Boolean} keepOriginal
 * @property {Boolean} errorNotFound
 * @property {Boolean} useModuleNam
 */

exports['default'] = function () {
    var userConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var knownProperties = undefined,
        unknownProperties = undefined;

    knownProperties = ['allowMultiple', 'includeOriginal', 'errorNotFound', 'useModuleName'];

    unknownProperties = _utils2['default'].difference(_utils2['default'].keys(userConfig), knownProperties);

    if (unknownProperties.length) {
        throw new Error('Unknown config property "' + unknownProperties[0] + '".');
    }

    _utils2['default'].forEach(userConfig, function (value, name) {
        if (typeof value !== 'boolean') {
            throw new Error('"' + name + '" property value must be a boolean.');
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

module.exports = exports['default'];