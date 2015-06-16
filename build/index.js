'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _domainSupervisor = require('domain-supervisor');

var _processes = require('./processes');

var _processes2 = _interopRequireDefault(_processes);

var _onError = require('./onError');

var _onError2 = _interopRequireDefault(_onError);

var BridgesSupervisor = (function () {
  function BridgesSupervisor(_ref) {
    var directory = _ref.directory;
    var _ref$inject = _ref.inject;
    var inject = _ref$inject === undefined ? [] : _ref$inject;

    _classCallCheck(this, BridgesSupervisor);

    this._supervisor = new _domainSupervisor.Supervisor();
    this.processes = new _processes2['default']({ directory: directory, inject: inject });
  }

  _createClass(BridgesSupervisor, [{
    key: 'start',
    value: function start() {
      var _this = this;

      return this.processes.asDomains().map(function (proc) {
        return _this._supervisor.run(proc, _onError2['default']);
      });
    }
  }]);

  return BridgesSupervisor;
})();

exports['default'] = BridgesSupervisor;
module.exports = exports['default'];