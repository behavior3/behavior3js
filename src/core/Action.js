import BaseNode from '../core/BaseNode';
import {ACTION} from '../constants';

/**
 * Action is the base class for all action nodes. Thus, if you want to create
 * new custom action nodes, you need to inherit from this class. For example,
 * take a look at the Runner action:
 *
 *     var Runner = b3.Class(b3.Action, {
 *       name: 'Runner',
 *
 *       tick: function(tick) {
 *         return b3.RUNNING;
 *       }
 *     });
 *
 * @module b3
 * @class Action
 * @extends BaseNode
 **/

export default class Action extends BaseNode {
  
  /**
   * Creates an instance of Action.
   * @param {Object} options 
   * @param {Object} options.name Node name. Default to `Action`.
   * @memberof Action
   */
  constructor({name = 'Action', title, properties}){
    super({
      category: ACTION,
      name,
      title,
      properties,
    });
  }

};
