'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _domainSupervisor = require('domain-supervisor');

var _requireAllToCamel = require('require-all-to-camel');

var _requireAllToCamel2 = _interopRequireDefault(_requireAllToCamel);

var Processes = (function () {
  function Processes(_ref) {
    var directory = _ref.directory;
    var inject = _ref.inject;

    _classCallCheck(this, Processes);

    this._processes = (0, _requireAllToCamel2['default'])(directory);
    this.inject = inject;
  }

  _createClass(Processes, [{
    key: 'asDomains',
    value: function asDomains() {
      return this.iterateWithBlock(this.wrapInDomain);
    }
  }, {
    key: 'wrapInDomain',
    value: function wrapInDomain(_, process) {
      var _this = this;

      var context = arguments[2] === undefined ? null : arguments[2];

      return new _domainSupervisor.Process(function () {
        process.apply(context, _this.inject);
      });
    }
  }, {
    key: 'iterateWithBlock',
    value: function iterateWithBlock(predicate) {
      var _this2 = this;

      return Object.keys(this._processes).map(function (key) {
        console.log('starting process: ', key);
        return predicate.call(_this2, key, _this2._processes[key]);
      });
    }
  }]);

  return Processes;
})();

exports['default'] = Processes;
module.exports = exports['default'];