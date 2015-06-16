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

var BridgesSupervisor = (function () {
  function BridgesSupervisor() {
    var _ref = arguments[0] === undefined ? { inject: [] } : arguments[0];

    var directory = _ref.directory;
    var inject = _ref.inject;

    _classCallCheck(this, BridgesSupervisor);

    this._supervisor = new _domainSupervisor.Supervisor();
    this.processes = (0, _requireAllToCamel2['default'])(directory);
    this.inject = inject;
  }

  _createClass(BridgesSupervisor, [{
    key: 'start',
    value: function start() {
      var _this = this;

      Object.keys(this.processes).forEach(function (name) {
        var proc = new _domainSupervisor.Process(function () {
          _this.processes[name].apply(null, _this.inject);
        });
        return _this.supervisor.run(proc, onError);
      });
    }
  }]);

  return BridgesSupervisor;
})();

exports['default'] = BridgesSupervisor;

function onError(error, restart, crash) {
  console.log('bridges:supervisor:error:message', error.message);
  console.log('bridges:supervisor:error:stack', error.stack);
  console.log('bridges:supervisor:restart');
  restart();
}
module.exports = exports['default'];