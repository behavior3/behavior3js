import Decorator from '../core/Decorator';
import {SUCCESS, ERROR, FAILURE} from '../constants';

/**
 * Repeater is a decorator that repeats the tick signal until the child node
 * return `RUNNING` or `ERROR`. Optionally, a maximum number of repetitions
 * can be defined.
 *
 * @module b3
 * @class Repeater
 * @extends Decorator
 **/

export default class Repeater extends Decorator {

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
   **/
  tick(tick) {
    if (!this.child) {
      return ERROR;
    }

    var i = tick.blackboard.get('i', tick.tree.id, this.id);
    var status = SUCCESS;

    while (this.maxLoop < 0 || i < this.maxLoop) {
      status = this.child._execute(tick);

      if (status == SUCCESS || status == FAILURE) {
          i++;
      } else {
        break;
      }
    }

    tick.blackboard.set('i', i, tick.tree.id, this.id);
    return status;
  }
};

/**
 * Node name. Default to `Repeater`.
 * @property {String} name
 * @readonly
 **/
Repeater.prototype.name = 'Repeater';

/**
 * Node title. Default to `Repeat XXx`. Used in Editor.
 * @property {String} title
 * @readonly
 **/
Repeater.prototype.title = 'Repeat <maxLoop>x';

/**
 * Node parameters.
 * @property {String} parameters
 * @readonly
 **/
Repeater.prototype.parameters = {maxLoop: -1};
