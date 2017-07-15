import Decorator from '../core/Decorator';
import {SUCCESS, ERROR} from '../constants';

/**
 * RepeatUntilFailure is a decorator that repeats the tick signal until the
 * node child returns `FAILURE`, `RUNNING` or `ERROR`. Optionally, a maximum
 * number of repetitions can be defined.
 *
 * @module b3
 * @class RepeatUntilFailure
 * @extends Decorator
 **/

export default class RepeatUntilFailure extends Decorator {

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
   * @param {Object} params Object with parameters.
   * @constructor
   **/
  constructor(params = {}) {
    super(params);
    this.maxLoop = params.maxLoop || -1;
  }

  /**
   * Open method.
   * @method open
   * @param {Tick} tick A tick instance.
   **/
  open(tick) {
    tick.blackboard.set('i', 0, tick.tree.id, this.id);
  }

  /**
   * Tick method.
   * @method tick
   * @param {Tick} tick A tick instance.
   * @return {Constant} A state constant.
   **/
  tick(tick) {
    if (!this.child) {
      return ERROR;
    }

    var i = tick.blackboard.get('i', tick.tree.id, this.id);
    var status = ERROR;

    while (this.maxLoop < 0 || i < this.maxLoop) {
      status = this.child._execute(tick);

      if (status == SUCCESS) {
        i++;
      } else {
        break;
      }
    }

    i = tick.blackboard.set('i', i, tick.tree.id, this.id);
    return status;
  }
};

/**
 * Node name. Default to `RepeatUntilFailure`.
 * @property {String} name
 * @readonly
 **/
RepeatUntilFailure.prototype.name = 'RepeatUntilFailure'

/**
 * Node title. Default to `Repeat Until Failure`.
 * @property {String} title
 * @readonly
 **/
RepeatUntilFailure.prototype.title = 'Repeat Until Failure'

/**
 * Node parameters.
 * @property {String} parameters
 * @readonly
 **/
RepeatUntilFailure.prototype.parameters = {maxLoop: -1}
