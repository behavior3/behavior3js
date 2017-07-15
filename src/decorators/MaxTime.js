import Decorator from '../core/Decorator';
import {FAILURE, ERROR} from '../constants';

/**
 * The MaxTime decorator limits the maximum time the node child can execute.
 * Notice that it does not interrupt the execution itself (i.e., the child
 * must be non-preemptive), it only interrupts the node after a `RUNNING`
 * status.
 *
 * @module b3
 * @class MaxTime
 * @extends Decorator
 **/

export default class MaxTime extends Decorator {

  /**
   * Initialization method.
   *
   * Settings parameters:
   *
   * - **maxTime** (*Integer*) Maximum time a child can execute.
   * - **child** (*BaseNode*) The child node.
   *
   * @method initialize
   * @param {Object} params Object with parameters.
   * @constructor
   **/
  constructor(params) {
    super(params);

    if (!params.maxTime) {
      throw "maxTime parameter in MaxTime decorator is an obligatory " +
        "parameter";
    }

    this.maxTime = params.maxTime;
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
    if (!this.child) {
      return ERROR;
    }

    var currTime = (new Date()).getTime();
    var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

    var status = this.child._execute(tick);
    if (currTime - startTime > this.maxTime) {
      return FAILURE;
    }

    return status;
  }
};

/**
 * Node name. Default to `MaxTime`.
 * @property {String} name
 * @readonly
 **/
MaxTime.prototype.name = 'MaxTime';

/**
 * Node title. Default to `Max XXms`. Used in Editor.
 * @property {String} title
 * @readonly
 **/
MaxTime.prototype.title = 'Max <maxTime>ms';

/**
 * Node parameters.
 * @property {String} parameters
 * @readonly
 **/
MaxTime.prototype.parameters = {'maxTime': 0};
