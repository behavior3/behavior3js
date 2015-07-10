(function() {
  "use strict";

  /**
   * Condition is the base class for all condition nodes. Thus, if you want to 
   * create new custom condition nodes, you need to inherit from this class. 
   *
   * @class Condition
   * @extends BaseNode
  **/
  b3.Condition = b3.Class(b3.BaseNode, {
    
    /**
     * Node category. Default to `b3.CONDITION`.
     * @property {String} category
     * @readonly
    **/
    category: b3.CONDITION,

    /**
     * Initialization method.
     * @method initialize
     * @constructor
    **/
    initialize: function(params) {
      b3.BaseNode.prototype.initialize.call(this);
    }

  });

})();