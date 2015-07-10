(function() {
  "use strict";

  /**
   * This action node returns `FAILURE` always.
   *
   * @class Failer
   * @extends Action
  **/
  b3.Failer = b3.Class(b3.Action, {
    
    /**
     * Node name. Default to `Failer`.
     * @property {String} name
     * @readonly
    **/
    name: 'Failer',

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `b3.FAILURE`.
    **/
    tick: function(tick) {
      return b3.FAILURE;
    },
  });
  
})();