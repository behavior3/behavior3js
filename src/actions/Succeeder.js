import Action from '../core/Action';
import {SUCCESS} from '../constants';

/**
 * This action node returns `SUCCESS` always.
 *
 * @module b3
 * @class Succeeder
 * @extends Action
 **/

export default class Succeeder extends Action {

  /**
   * Node name. Default to `Succeeder`.
   * 
   * @readonly
   * @memberof Succeeder
   */
  get name(){
    return 'Succeeder';
  }

  /**
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `SUCCESS`.
   **/
  tick(tick) {
    return SUCCESS;
  }
};
