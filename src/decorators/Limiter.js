(function() {
  "use strict";

  /**
   * This decorator limit the number of times its child can be called. After a
   * certain number of times, the Limiter decorator returns `FAILURE` without 
   * executing the child.
   *
   * @class Limiter
   * @extends Decorator
  **/
  b3.Limiter = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `Limiter`.
     * @property {String} name
     * @readonly
    **/
    name: 'Limiter',

    /**
     * Node title. Default to `Limit X Activations`. Used in Editor.
     * @property {String} title
     * @readonly
    **/
    title: 'Limit <maxLoop> Activations',

    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
    **/
    parameters: {'maxLoop': 1},
    
    /**
     * Initialization method. 
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions.
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param {Object} settings Object with parameters.
     * @constructor
    **/
    initialize: function(settings) {
      settings = settings || {};

      b3.Decorator.prototype.initialize.call(this, settings);

      if (!settings.maxLoop) {
        throw "maxLoop parameter in Limiter decorator is an obligatory " +
              "parameter";
      }

      this.maxLoop = settings.maxLoop;
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

      if (i < this.maxLoop) {
        var status = this.child._execute(tick);

        if (status == b3.SUCCESS || status == b3.FAILURE)
            tick.blackboard.set('i', i+1, tick.tree.id, this.id);
          
        return status;
      }

      return b3.FAILURE;        
    }
  });

})();