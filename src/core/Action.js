(function() {
  "use strict";

  /**
   * Action is the base class for all action nodes. Thus, if you want to create
   * new custom action nodes, you need to inherit from this class. For example,
   * take a look at the Runner action:
   * 
   *     var Runner = b3.Class(b3.Action, {
   *       name: 'Runner',
   *
   *       tick: function(tick) {
   *         return b3.RUNNING;
   *       }
   *     });
   *
   * @module b3
   * @class Action
   * @extends BaseNode
  **/
  b3.Action = b3.Class(b3.BaseNode, {
    
    /**
     * Node category. Default to `b3.ACTION`.
     * @property {String} category
     * @readonly
    **/
    category: b3.ACTION,

    /**
     * Initialization method.
     * @method initialize
     * @constructor
    **/
    initialize: function() {
      b3.BaseNode.prototype.initialize.call(this);
    }
  });

})();