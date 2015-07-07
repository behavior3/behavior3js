(function() {
  "use strict";

  /**
   * Action is the base class for all action nodes. Thus, if you want to 
   * create new custom action nodes, you need to inherit from this class. 
   *
   * For example, take a look at the Runner action:
   * 
   *     var Runner = b3.Class(b3.Action);
   *     var p = Runner.prototype;
   *     
   *         p.name = 'Runner';
   *     
   *         p.tick = function(tick) {
   *             return b3.RUNNING;
   *         }
   *
   * @module b3
   * @class Action
   * @extends BaseNode
  **/
  var Action = b3.Class(b3.BaseNode);

  var p = Action.prototype;

  /**
   * Node category. Default to `b3.ACTION`.
   *
   * @property category
   * @type {String}
   * @readonly
  **/
  p.category = b3.ACTION;

  p.__BaseNode_initialize = p.initialize;
  /**
   * Initialization method.
   *
   * @method initialize
   * @constructor
  **/
  p.initialize = function() {
    this.__BaseNode_initialize();
  };

  b3.Action = Action;

})();