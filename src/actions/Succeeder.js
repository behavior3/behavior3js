this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * This action node returns `SUCCESS` always.
   *
   * @class Succeeder
   * @extends Action
  **/
  var Succeeder = b3.Class(b3.Action);

  var p = Succeeder.prototype;

  /**
   * Node name. Default to `Succeeder`.
   *
   * @property name
   * @type String
   * @readonly
  **/
  p.name = 'Succeeder';

  /**
   * Tick method.
   *
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `b3.SUCCESS`.
  **/
  p.tick = function(tick) {
    return b3.SUCCESS;
  };

  b3.Succeeder = Succeeder;

})();