// Generated by CoffeeScript 1.10.0
var Event;

module.exports = Event = (function() {
  Event.target = null;

  function Event(name, src, target, realTarget, realEvent) {
    var relative;
    this.name = name;
    this.src = src;
    this.target = target;
    this.realEvent = realEvent;
    this.clientX = this.realEvent.clientX;
    this.clientY = this.realEvent.clientY;
    relative = this.relative(this.target);
    this.layerX = relative.x;
    this.layerY = relative.y;
    this.own = this.src === this.target;
    this.prevented = false;
    this.stopped = false;
    return;
  }

  Event.prototype.relative = function(element) {
    var rect, x, y;
    rect = element.rect();
    x = this.clientX - rect.left;
    y = this.clientY - rect.top;
    return {
      x: x,
      y: y
    };
  };

  Event.prototype.emit = function(handler) {
    Event.target = this.target;
    this.target.emit(this.name, this);
    Event.target = null;
  };

  Event.prototype.prevent = function() {
    this.prevented = true;
    this.realEvent.preventDefault();
  };

  Event.prototype.stop = function() {
    this.stopped = true;
    this.realEvent.stopPropagation();
  };

  return Event;

})();

//# sourceMappingURL=event.js.map
