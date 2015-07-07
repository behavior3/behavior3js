this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * MemSequence is similar to Sequence node, but when a child returns a 
   * `RUNNING` state, its index is recorded and in the next tick the MemPriority 
   * call the child recorded directly, without calling previous children again.
   *
   * @class MemPriority
   * @extends Composite
  **/
  var MemSequence = b3.Class(b3.Composite);

  var p = MemSequence.prototype;

  /**
   * Node name. Default to `MemSequence`.
   *
   * @property name
   * @type {String}
   * @readonly
  **/
  p.name = 'MemSequence';

  /**
   * Open method.
   *
   * @method open
   * @param {b3.Tick} tick A tick instance.
  **/
  p.open = function(tick) {
    tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
  };

  /**
   * Tick method.
   *
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} A state constant.
  **/
  p.tick = function(tick) {
    var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
    for (var i=child; i<this.children.length; i++) {
      var status = this.children[i]._execute(tick);

      if (status !== b3.SUCCESS) {
        if (status === b3.RUNNING) {
          tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
        }
        return status;
      }
    }

    return b3.SUCCESS;
  };

  b3.MemSequence = MemSequence;

})();