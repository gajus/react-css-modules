'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashCollectionForEach = require('lodash/collection/forEach');

var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

var _lodashObjectValues = require('lodash/object/values');

var _lodashObjectValues2 = _interopRequireDefault(_lodashObjectValues);

var _lodashLangIsArray = require('lodash/lang/isArray');

var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);

exports['default'] = {
    forEach: _lodashCollectionForEach2['default'],
    values: _lodashObjectValues2['default'],
    isArray: _lodashLangIsArray2['default']
};
module.exports = exports['default'];