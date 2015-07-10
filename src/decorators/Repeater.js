(function() {
  "use strict";

  /**
   * Repeater is a decorator that repeats the tick signal until the child node 
   * return `RUNNING` or `ERROR`. Optionally, a maximum number of repetitions 
   * can be defined.
   *
   * @module b3
   * @class Repeater
   * @extends Decorator
  **/
  b3.Repeater = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `Repeater`.
     * @property {String} name
     * @readonly
    **/
    name: 'Repeater',

    /**
     * Node title. Default to `Repeat XXx`. Used in Editor.
     * @property {String} title
     * @readonly
    **/
    title: 'Repeat <maxLoop>x',

    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
    **/
    parameters: {'maxLoop': -1},

    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 
     *                           (infinite).
     * - **child** (*BaseNode*) The child node.
     * 
     * @method initialize
     * @param {Object} params Object with parameters.
     * @constructor
    **/
    initialize: function(params) {
      b3.Decorator.prototype.initialize.call(this, params);
      this.maxLoop = params.maxLoop || -1;
    },

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    open: function(tick) {
      tick.blackboard.set('i', 0, tick.tree.id, this.id);
    },

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
    **/
    tick: function(tick) {
      if (!this.child) {
          return b3.ERROR;
      }

      var i = tick.blackboard.get('i', tick.tree.id, this.id);
      var status = b3.SUCCESS;

      while (this.maxLoop < 0 || i < this.maxLoop) {
        status = this.child._execute(tick);

        if (status == b3.SUCCESS || status == b3.FAILURE) {
            i++;
        } else {
          break;
        }
      }

      i = tick.blackboard.set('i', i, tick.tree.id, this.id);
      return status;
    }
  });

})();