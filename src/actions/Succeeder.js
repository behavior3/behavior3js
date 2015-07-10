(function() {
  "use strict";

  /**
   * This action node returns `SUCCESS` always.
   *
   * @module b3
   * @class Succeeder
   * @extends Action
  **/
  b3.Succeeder = b3.Class(b3.Action, {

    /**
     * Node name. Default to `Succeeder`.
     * @property {String} name
     * @readonly
    **/
    name: 'Succeeder',

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `b3.SUCCESS`.
    **/
    tick: function(tick) {
      return b3.SUCCESS;
    }
  });

})();