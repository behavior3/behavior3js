import {ERROR} from '../constants';
import {Class} from '../b3.functions';
import Action from '../core/Action';

/**
 * This action node returns `ERROR` always.
 *
 * @module b3
 * @class Error
 * @extends Action
 **/
export default Class(Action, {

  /**
   * Node name. Default to `Error`.
   * @property {String} name
   * @readonly
   **/
  name: 'Error',

  /**
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `ERROR`.
   **/
  tick: function(tick) {
    return ERROR;
  }
});
