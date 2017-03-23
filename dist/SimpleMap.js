"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.size = 0;
    this.keys = [];
    this.values = [];
  }

  _class.prototype.get = function get(key) {
    var index = this.keys.indexOf(key);

    return this.values[index];
  };

  _class.prototype.set = function set(key, value) {
    this.keys.push(key);
    this.values.push(value);
    this.size = this.keys.length;

    return value;
  };

  return _class;
}();

exports.default = _class;
module.exports = exports["default"];