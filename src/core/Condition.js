this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * Condition is the base class for all condition nodes. Thus, if you want to 
   * create new custom condition nodes, you need to inherit from this class. 
   *
   * @class Condition
   * @extends BaseNode
  **/
  var Condition = b3.Class(b3.BaseNode);

  var p = Condition.prototype;

  /**
   * Node category. Default to `b3.CONDITION`.
   *
   * @property category
   * @type {String}
   * @readonly
  **/
  p.category = b3.CONDITION;

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

  b3.Condition = Condition;

})();