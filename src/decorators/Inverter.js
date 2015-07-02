this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * The Inverter decorator inverts the result of the child, returning `SUCCESS`
   * for `FAILURE` and `FAILURE` for `SUCCESS`.
   *
   * @class Inverter
   * @extends Decorator
  **/
  var Inverter = b3.Class(b3.Decorator);

  var p = Inverter.prototype;

  /**
   * Node name. Default to `Inverter`.
   *
   * @property name
   * @type {String}
   * @readonly
  **/
  p.name = 'Inverter';

  /**
   * Tick method.
   *
   * @method tick
   * @param {Tick} tick A tick instance.
   * @returns {Constant} A state constant.
  **/
  p.tick = function(tick) {
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
  };

  b3.Inverter = Inverter;

})();