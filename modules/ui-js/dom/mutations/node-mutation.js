// Generated by CoffeeScript 1.10.0
var NodeMutation;

module.exports = NodeMutation = (function() {
  function NodeMutation(node) {
    this.oldChildState = [];
    this.childrenChanged = false;
    return;
  }

  NodeMutation.prototype.changeChildren = function() {
    this.childrenChanged = true;
  };

  return NodeMutation;

})();

//# sourceMappingURL=node-mutation.js.map
