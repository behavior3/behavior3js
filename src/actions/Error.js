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
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `ERROR`.
   **/
  tick(tick) {
    return ERROR;
  }
};

/**
 * Node name. Default to `Error`.
 * @property {String} name
 * @readonly
 **/
Error.prototype.name = 'Error';
