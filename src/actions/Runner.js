import Action from '../core/Action';
import {RUNNING} from '../constants';

/**
 * This action node returns RUNNING always.
 *
 * @module b3
 * @class Runner
 * @extends Action
 **/
export default class Runner extends Action {

  /**
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `RUNNING`.
   **/
  tick(tick) {
    return RUNNING;
  }
};

/**
 * Node name. Default to `Runner`.
 * @property {String} name
 * @readonly
 **/
Runner.prototype.name = 'Runner';

