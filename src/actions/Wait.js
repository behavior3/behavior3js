import Action from '../core/Action';
import {SUCCESS, RUNNING} from '../constants';

/**
 * Wait a few seconds.
 *
 * @module b3
 * @class Wait
 * @extends Action
 **/

export default class Wait extends Action {

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
  constructor(settings) {
    settings = settings || {};

    super();
    this.endTime = settings.milliseconds || 0;
  }

  /**
   * Open method.
   * @method open
   * @param {Tick} tick A tick instance.
   **/
  open(tick) {
    var startTime = (new Date()).getTime();
    tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
  }

  /**
   * Tick method.
   * @method tick
   * @param {Tick} tick A tick instance.
   * @return {Constant} A state constant.
   **/
  tick(tick) {
    var currTime = (new Date()).getTime();
    var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

    if (currTime - startTime > this.endTime) {
      return SUCCESS;
    }

    return RUNNING;
  }
};

/**
 * Node name. Default to `Wait`.
 * @property {String} name
 * @readonly
 **/
Wait.prototype.name = 'Wait';

/**
 * Node title. Default to `Wait XXms`. Used in Editor.
 * @property {String} title
 * @readonly
 **/
Wait.prototype.title = 'Wait <milliseconds>ms';

/**
 * Node parameters.
 * @property {String} parameters
 * @readonly
 **/
Wait.prototype.parameters = {milliseconds: 0};
