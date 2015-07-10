(function() {
  "use strict";

  /**
   * The Inverter decorator inverts the result of the child, returning `SUCCESS`
   * for `FAILURE` and `FAILURE` for `SUCCESS`.
   *
   * @class Inverter
   * @extends Decorator
  **/
  b3.Inverter = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `Inverter`.
     * @property {String} name
     * @readonly
    **/
    name: 'Inverter',

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

      var status = this.child._execute(tick);

      if (status == b3.SUCCESS) {
        status = b3.FAILURE;
      } else if (status == b3.FAILURE) {
        status = b3.SUCCESS;
      }

      return status;
    }
  });

})();