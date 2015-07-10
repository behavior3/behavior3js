(function() {
  "use strict";

  /**
   * This action node returns `ERROR` always.
   *
   * @module b3
   * @class Error
   * @extends Action
  **/
  b3.Error = b3.Class(b3.Action, {

    /**
     * Node name. Default to `Error`.
     * @property {String} name
     * @readonly
    **/
    name: 'Error',

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `b3.ERROR`.
    **/
    tick: function(tick) {
      return b3.ERROR;
    }
  });
  
})();