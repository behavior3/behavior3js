import {Class} from '../b3.functions';
import Action from '../core/Action';
import {SUCCESS} from '../constants';

/**
 * This action node returns `SUCCESS` always.
 *
 * @module b3
 * @class Succeeder
 * @extends Action
 **/

export default Class(Action, {

  /**
   * Node name. Default to `Succeeder`.
   * @property {String} name
   * @readonly
   **/
  name: 'Succeeder',

  /**
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `SUCCESS`.
   **/
  tick: function(tick) {
    return SUCCESS;
  }
});
