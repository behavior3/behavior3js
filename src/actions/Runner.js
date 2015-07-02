this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * This action node returns RUNNING always.
   *
   * @class Runner
   * @extends Action
  **/
  var Runner = b3.Class(b3.Action);

  var p = Runner.prototype;

  /**
   * Node name. Default to `Runner`.
   *
   * @property name
   * @type {String}
   * @readonly
  **/
  p.name = 'Runner';

  /**
   * Tick method.
   *
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @returns {Constant} Always return `b3.RUNNING`.
  **/
  p.tick = function(tick) {
      return b3.RUNNING;
  };

  b3.Runner = Runner;

})();