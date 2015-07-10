(function() {
  "use strict";

  /**
   * This action node returns RUNNING always.
   *
   * @class Runner
   * @extends Action
  **/
  b3.Runner = b3.Class(b3.Action, {

    /**
     * Node name. Default to `Runner`.
     * @property {String} name
     * @readonly
    **/
    name: 'Runner',

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `b3.RUNNING`.
    **/
    tick: function(tick) {
      return b3.RUNNING;
    }
  });
  
})();