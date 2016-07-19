// Generated by CoffeeScript 1.10.0
var EventEmitter, eventHandlers;

eventHandlers = "eventHandlers " + (Math.random());

module.exports = EventEmitter = (function() {
  function EventEmitter() {}

  EventEmitter.prototype.on = function(type, handler) {
    var allHandlers, handlers;
    allHandlers = this[eventHandlers] != null ? this[eventHandlers] : this[eventHandlers] = {};
    handlers = allHandlers[type] || (allHandlers[type] = []);
    handlers.push(handler);
    return this;
  };

  EventEmitter.prototype.one = function(type, handler) {
    var self, wrapper;
    self = this;
    wrapper = function() {
      var returns;
      returns = handler.apply(this, arguments);
      self.off(type, wrapper);
      return returns;
    };
    this.on(type, wrapper);
    return this;
  };

  EventEmitter.prototype.off = function(type, handler) {
    var allHandlers, handlers;
    if (!this[eventHandlers]) {
      return;
    }
    allHandlers = this[eventHandlers];
    handlers = allHandlers[type];
    if (!handlers) {
      return;
    }
    if (!handler) {
      delete allHandlers[type];
    } else {
      handlers = handlers.filter(function(setHandler) {
        return setHandler !== handler;
      });
      allHandlers[type] = handlers;
    }
    return this;
  };

  EventEmitter.prototype.emit = function(type, data) {
    var handler, handlers, i, len, ref;
    if (!this[eventHandlers]) {
      return;
    }
    handlers = this[eventHandlers][type];
    if (!handlers) {
      return;
    }
    ref = handlers.slice();
    for (i = 0, len = ref.length; i < len; i++) {
      handler = ref[i];
      handler(data);
    }
    return this;
  };

  EventEmitter.prototype.hasEventHandlers = function(type) {
    var ref, ref1;
    if (!((ref = this[eventHandlers]) != null ? ref[type] : void 0)) {
      return false;
    }
    return ((ref1 = this[eventHandlers]) != null ? ref1[type].length : void 0) > 0;
  };

  EventEmitter.prototype.removeAllEventHandlers = function() {
    delete this[eventHandlers];
  };

  return EventEmitter;

})();

//# sourceMappingURL=event-emitter.js.map
