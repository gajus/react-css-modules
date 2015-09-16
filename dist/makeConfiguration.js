'use strict';

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @typedef CSSModules~Options
 * @see {@link https://github.com/gajus/react-css-modules#options}
 * @property {Boolean} allowMultiple
 * @property {Boolean} errorWhenNotFound
 */

/**
 * @param {CSSModules~Options} userConfiguration
 * @return {CSSModules~Options}
 */

exports['default'] = function () {
    var userConfiguration = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var configuration = undefined;

    configuration = {
        allowMultiple: false,
        errorWhenNotFound: true
    };

    (0, _lodashCollectionForEach3['default'])(userConfiguration, function (value, name) {
        if (typeof configuration[name] === 'undefined') {
            throw new Error('Unknown configuration property "' + name + '".');
        }

        if (typeof value !== 'boolean') {
            throw new Error('"' + name + '" property value must be a boolean.');
        }

        configuration[name] = value;
    });

    return configuration;
};

module.exports = exports['default'];