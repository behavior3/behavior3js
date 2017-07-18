import {ERROR} from '../constants';
import Action from '../core/Action';

/**
 * This action node returns `ERROR` always.
 *
 * @module b3
 * @class Error
 * @extends Action
 **/
export default class Error extends Action {

  /**
   * Node name. Default to `Error`.
   * 
   * @readonly
   * @memberof Error
   */
  get name(){
    return 'Error';
  }

  /**
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `ERROR`.
   **/
  tick(tick) {
    return ERROR;
  }
};
