(function() {
  "use strict";

  /**
   * Priority ticks its children sequentially until one of them returns 
   * `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state,
   * the priority also returns `FAILURE`.
   *
   * @module b3
   * @class Priority
   * @extends Composite
  **/
  b3.Priority = b3.Class(b3.Composite, {

    /**
     * Node name. Default to `Priority`.
     * @property {String} name
     * @readonly
    **/
    name: 'Priority',

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      for (var i=0; i<this.children.length; i++) {
        var status = this.children[i]._execute(tick);

        if (status !== b3.FAILURE) {
          return status;
        }
      }

      return b3.FAILURE;
    }
  });

})();