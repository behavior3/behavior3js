this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * RepeatUntilFailure is a decorator that repeats the tick signal until the 
   * node child returns `FAILURE`, `RUNNING` or `ERROR`. Optionally, a maximum 
   * number of repetitions can be defined.
   *
   * @class RepeatUntilFailure
   * @extends Decorator
  **/
  var RepeatUntilFailure = b3.Class(b3.Decorator);

  var p = RepeatUntilFailure.prototype;

  /**
   * Node name. Default to `RepeatUntilFailure`.
   *
   * @property name
   * @type {String}
   * @readonly
  **/
  p.name = 'RepeatUntilFailure';

  /**
   * Node title. Default to `Repeat Until Failure`.
   *
   * @property title
   * @type {String}
   * @readonly
  **/
  p.title = 'Repeat Until Failure';

  /**
   * Node parameters.
   *
   * @property parameters
   * @type {String}
   * @readonly
  **/
  p.parameters = {'maxLoop': -1};

  p.__Decorator_initialize = p.initialize;
  /**
   * Initialization method.
   *
   * Settings parameters:
   *
   * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 
   *                           (infinite).
   * - **child** (*BaseNode*) The child node.
   *
   * @method initialize
   * @param {Object} settings Object with parameters.
   * @constructor
  **/
  p.initialize = function(settings) {
    settings = settings || {};

    this.__Decorator_initialize(settings);
    this.maxLoop = settings.maxLoop || -1;
  };

  /**
   * Open method.
   *
   * @method open
   * @param {Tick} tick A tick instance.
  **/
  p.open = function(tick) {
    tick.blackboard.set('i', 0, tick.tree.id, this.id);
  };

  /**
   * Tick method.
   *
   * @method tick
   * @param {Tick} tick A tick instance.
   * @return {Constant} A state constant.
  **/
  p.tick = function(tick) {
    if (!this.child) {
      return b3.ERROR;
    }

    var i = tick.blackboard.get('i', tick.tree.id, this.id);
    var status = b3.ERROR;

    while (this.maxLoop < 0 || i < this.maxLoop) {
      status = this.child._execute(tick);

      if (status == b3.SUCCESS) {
        i++;
      } else {
        break;
      }
    }

    i = tick.blackboard.set('i', i, tick.tree.id, this.id);
    return status;
  };

  b3.RepeatUntilFailure = RepeatUntilFailure;

})();