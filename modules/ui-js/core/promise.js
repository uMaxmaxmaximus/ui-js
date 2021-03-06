// Generated by CoffeeScript 1.10.0
var EventEmitter, SystemPromise, UiJsPromise;

EventEmitter = require('ui-js/core/event-emitter');

SystemPromise = window.Promise;

module.exports = UiJsPromise = function(caller) {
  var _reject, _resolve, promise;
  _resolve = null;
  _reject = null;
  promise = new SystemPromise(function(resolve, reject) {
    _resolve = resolve;
    _reject = reject;
    return typeof caller === "function" ? caller(resolve, reject) : void 0;
  });
  promise.resolve = _resolve;
  promise.reject = _reject;
  return promise;
};

UiJsPromise.prototype = SystemPromise.prototype;

UiJsPromise.all = function() {
  return SystemPromise.all.apply(SystemPromise, arguments);
};

UiJsPromise.race = function() {
  return SystemPromise.race.apply(SystemPromise, arguments);
};

UiJsPromise.race = function() {
  return SystemPromise.race.apply(SystemPromise, arguments);
};

UiJsPromise.defer = function() {
  return SystemPromise.defer.apply(SystemPromise, arguments);
};

UiJsPromise.accept = function() {
  return SystemPromise.accept.apply(SystemPromise, arguments);
};

UiJsPromise.reject = function() {
  return SystemPromise.reject.apply(SystemPromise, arguments);
};

UiJsPromise.resolve = function() {
  return SystemPromise.resolve.apply(SystemPromise, arguments);
};

//# sourceMappingURL=promise.js.map
