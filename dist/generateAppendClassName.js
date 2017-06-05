'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomMap = _immutable2.default.Map;

var stylesIndex = new CustomMap();

exports.default = function (styles, themes, styleNames, errorWhenNotFound) {
  var appendClassName = void 0;
  var stylesIndexMap = void 0;

  var styleNameIndex = stylesIndex.getIn([styles, themes, styleNames]);
  if (styleNameIndex) {
    return styleNameIndex;
  }

  appendClassName = '';

  for (var styleName in styleNames) {
    if (styleNames.hasOwnProperty(styleName)) {
      var key = styleNames[styleName];
      var className = themes[key];
      if (className == undefined) {
        className = styles[key];
      }

      if (className) {
        appendClassName += ' ' + className;
      } else if (errorWhenNotFound === true) {
        throw new Error('"' + styleNames[styleName] + '" CSS module is undefined.');
      }
    }
  }

  appendClassName = appendClassName.trim();

  stylesIndex = stylesIndex.setIn([styles, themes, styleNames], appendClassName);

  return appendClassName;
};

module.exports = exports['default'];