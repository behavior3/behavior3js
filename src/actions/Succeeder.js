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
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} Always return `SUCCESS`.
   **/
  tick(tick) {
    return SUCCESS;
  }
};

/**
 * Node name. Default to `Succeeder`.
 * @property {String} name
 * @readonly
 **/
Succeeder.prototype.name = 'Succeeder';
