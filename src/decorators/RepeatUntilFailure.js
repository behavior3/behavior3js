(function() {
  "use strict";

  /**
   * RepeatUntilFailure is a decorator that repeats the tick signal until the 
   * node child returns `FAILURE`, `RUNNING` or `ERROR`. Optionally, a maximum 
   * number of repetitions can be defined.
   *
   * @class RepeatUntilFailure
   * @extends Decorator
  **/
  b3.RepeatUntilFailure = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `RepeatUntilFailure`.
     * @property {String} name
     * @readonly
    **/
    name: 'RepeatUntilFailure',

    /**
     * Node title. Default to `Repeat Until Failure`.
     * @property {String} title
     * @readonly
    **/
    title: 'Repeat Until Failure',

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
     * @param {Object} settings Object with parameters.
     * @constructor
    **/
    initialize: function(settings) {
      settings = settings || {};

      b3.Decorator.prototype.initialize.call(this, settings);
      this.maxLoop = settings.maxLoop || -1;
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
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      if (!this.child) {
        return b3.ERROR;
      }

      var i = tick.blackboard.get('i', tick.tree.id, this.id);
      var status = b3.ERROR;

      while (this.maxLoop < 0 || i < this.maxLoop) {
        status = this.child._execute(tick);

        if (status == b3.SUCCESS) {
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