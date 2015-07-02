this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * Priority ticks its children sequentially until one of them returns 
   * `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state, 
   * the priority also returns `FAILURE`.
   *
   * @class Priority
   * @extends Composite
  **/
  var Priority = b3.Class(b3.Composite);

  var p = Priority.prototype;

  /**
   * Node name. Default to `Priority`.
   *
   * @property name
   * @type String
   * @readonly
  **/
  p.name = 'Priority';

  /**
   * Tick method.
   *
   * @method tick
   * @param {Tick} tick A tick instance.
   * @returns {Constant} A state constant.
  **/
  p.tick = function(tick) {
    for (var i=0; i<this.children.length; i++) {
      var status = this.children[i]._execute(tick);

      if (status !== b3.FAILURE) {
        return status;
      }
    }

    return b3.FAILURE;
  };

b3.Priority = Priority;

})();