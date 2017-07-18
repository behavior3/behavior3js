import Action from '../core/Action';
import {FAILURE} from '../constants';

/**
 * This action node returns `FAILURE` always.
 *
 * @module b3
 * @class Failer
 * @extends Action
 **/
export default class Failer extends Action {

  /**
   * Node name. Default to `Failer`.
   * 
   * @readonly
   * @memberof Failer
   */
  get name(){
    return 'Failer';
  }

  /**
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `FAILURE`.
   **/
  tick(tick) {
    return FAILURE;
  }
};
