'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

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

exports['default'] = function () {
    var userConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var knownProperties = undefined,
        unknownProperties = undefined;

    knownProperties = ['allowMultiple', 'errorWhenNotFound'];

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
        userConfig.allowMultiple = false;
    }

    if (typeof userConfig.errorWhenNotFound === 'undefined') {
        userConfig.errorWhenNotFound = true;
    }

    return userConfig;
};

module.exports = exports['default'];