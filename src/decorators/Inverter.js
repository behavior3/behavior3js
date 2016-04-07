import {Class} from '../b3.functions';
import Decorator from '../core/Decorator';
import {FAILURE, SUCCESS, ERROR} from '../constants';

"use strict";

/**
 * The Inverter decorator inverts the result of the child, returning `SUCCESS`
 * for `FAILURE` and `FAILURE` for `SUCCESS`.
 *
 * @module b3
 * @class Inverter
 * @extends Decorator
 **/

export default Class(Decorator, {

  /**
   * Node name. Default to `Inverter`.
   * @property {String} name
   * @readonly
   **/
  name: 'Inverter',

  /**
   * Tick method.
   * @method tick
   * @param {Tick} tick A tick instance.
   * @return {Constant} A state constant.
   **/
  tick: function(tick) {
    if (!this.child) {
      return ERROR;
    }

    var status = this.child._execute(tick);

    if (status == SUCCESS) {
      status = FAILURE;
    } else if (status == FAILURE) {
      status = SUCCESS;
    }

    return status;
  }
});
