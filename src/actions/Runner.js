import {Class} from '../b3.functions';
import Action from '../core/Action';
import {RUNNING} from '../constants';

/**
 * This action node returns RUNNING always.
 *
 * @module b3
 * @class Runner
 * @extends Action
 **/
export default Class(Action, {

  /**
   * Node name. Default to `Runner`.
   * @property {String} name
   * @readonly
   **/
  name: 'Runner',

  /**
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `RUNNING`.
   **/
  tick: function(tick) {
    return RUNNING;
  }
});
