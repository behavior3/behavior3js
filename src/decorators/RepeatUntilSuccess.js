import Decorator from '../core/Decorator';
import {SUCCESS, ERROR, FAILURE} from '../constants';

/**
 * RepeatUntilSuccess is a decorator that repeats the tick signal until the
 * node child returns `SUCCESS`, `RUNNING` or `ERROR`. Optionally, a maximum
 * number of repetitions can be defined.
 *
 * @module b3
 * @class RepeatUntilSuccess
 * @extends Decorator
 **/

export default class RepeatUntilSuccess extends Decorator {

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

      if (status == FAILURE) {
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
 * Node name. Default to `RepeatUntilSuccess`.
 * @property {String} name
 * @readonly
 **/
RepeatUntilSuccess.prototype.name = 'RepeatUntilSuccess';

/**
 * Node title. Default to `Repeat Until Success`.
 * @property {String} title
 * @readonly
 **/
RepeatUntilSuccess.prototype.title = 'Repeat Until Success';

/**
 * Node parameters.
 * @property {String} parameters
 * @readonly
 **/
RepeatUntilSuccess.prototype.parameters = {'maxLoop': -1};
