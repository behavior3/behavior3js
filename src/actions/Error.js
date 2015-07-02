this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * This action node returns `ERROR` always.
   *
   * @class Error
   * @extends Action
  **/
  var Error = b3.Class(b3.Action);

  var p = Error.prototype;

  /**
   * Node name. Default to `Error`.
   *
   * @property name
   * @type {String}
   * @readonly
  **/
  p.name = 'Error';

  /**
   * Tick method.
   *
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @returns {Constant} Always return `b3.ERROR`.
  **/
  p.tick = function(tick) {
      return b3.ERROR;
  };

  b3.Error = Error;

})();