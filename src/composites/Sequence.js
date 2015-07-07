this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * The Sequence node ticks its children sequentially until one of them returns 
   * `FAILURE`, `RUNNING` or `ERROR`. If all children return the success state, 
   * the sequence also returns `SUCCESS`.
   *
   * @class Sequence
   * @extends Composite
  **/
  var Sequence = b3.Class(b3.Composite);

  var p = Sequence.prototype;

  /**
   * Node name. Default to `Sequence`.
   *
   * @property name
   * @type {String}
   * @readonly
  **/
  p.name = 'Sequence';

  /**
   * Tick method.
   *
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} A state constant.
  **/
  p.tick = function(tick) {
    for (var i=0; i<this.children.length; i++) {
      var status = this.children[i]._execute(tick);

      if (status !== b3.SUCCESS) {
        return status;
      }
    }

    return b3.SUCCESS;
  };

  b3.Sequence = Sequence;

})();