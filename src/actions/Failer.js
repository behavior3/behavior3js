import {Class} from '../b3.functions';
import Action from '../core/Action';
import {FAILURE} from '../constants';

/**
 * This action node returns `FAILURE` always.
 *
 * @module b3
 * @class Failer
 * @extends Action
 **/
export default Class(Action, {

  /**
   * Node name. Default to `Failer`.
   * @property {String} name
   * @readonly
   **/
  name: 'Failer',

  /**
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `FAILURE`.
   **/
  tick: function(tick) {
    return FAILURE;
  }
});
