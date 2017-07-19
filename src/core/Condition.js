import BaseNode from './BaseNode';
import {CONDITION} from '../constants';

/**
 * Condition is the base class for all condition nodes. Thus, if you want to
 * create new custom condition nodes, you need to inherit from this class.
 *
 * @class Condition
 * @extends BaseNode
 **/

export default class Condition extends BaseNode {

  /**
   * Creates an instance of Condition.
   * @param {Object} options 
   * @param {Object} options.params 
   * @param {Object} options.name Node name. Default to `Condition`.
   * @memberof Condition
   */
  constructor({params, name = 'Condition', title, properties}) {
    super({
      category: CONDITION,
      name,
      title,
      properties,
    });
  }

};
