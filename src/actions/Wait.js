this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * Wait a few seconds.
   *
   * @class Wait
   * @extends Action
  **/
  var Wait = b3.Class(b3.Action);

  var p = Wait.prototype;
    
  /**
   * Node name. Default to `Wait`.
   *
   * @property name
   * @type {String}
   * @readonly
  **/
  p.name = 'Wait';

  /**
   * Node title. Default to `Wait XXms`. Used in Editor.
   *
   * @property title
   * @type {String}
   * @readonly
  **/
  p.title = 'Wait <milliseconds>ms';

  /**
   * Node parameters.
   *
   * @property parameters
   * @type {String}
   * @readonly
  **/
  p.parameters = {'milliseconds': 0};

  p.__Action_initialize = p.initialize;
  /**
   * Initialization method.
   *
   * Settings parameters:
   *
   * - **milliseconds** (*Integer*) Maximum time, in milliseconds, a child
   *                                can execute.
   *
   * @method initialize
   * @param {Object} settings Object with parameters.
   * @constructor
  **/
  p.initialize = function(settings) {
    settings = settings || {};

    this.__Action_initialize();

    this.endTime = settings.milliseconds || 0;
  };

  /**
   * Open method.
   *
   * @method open
   * @param {Tick} tick A tick instance.
  **/
  p.open = function(tick) {
    var startTime = (new Date()).getTime();
    tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
  };

  /**
   * Tick method.
   *
   * @method tick
   * @param {Tick} tick A tick instance.
   * @returns {Constant} A state constant.
  **/
  p.tick = function(tick) {
    var currTime = (new Date()).getTime();
    var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
    
    if (currTime - startTime > this.endTime) {
      return b3.SUCCESS;
    }
    
    return b3.RUNNING;
  };

  b3.Wait = Wait;

})();