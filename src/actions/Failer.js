this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * This action node returns `FAILURE` always.
   *
   * @class Failer
   * @extends Action
  **/
  var Failer = b3.Class(b3.Action);

  var p = Failer.prototype;

  /**
   * Node name. Default to `Failer`.
   *
   * @property name
   * @type {String}
   * @readonly
  **/
  p.name = 'Failer';

  /**
   * Tick method.
   *
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @returns {Constant} Always return `b3.FAILURE`.
  **/
  p.tick = function(tick) {
      return b3.FAILURE;
  };

  b3.Failer = Failer;

})();