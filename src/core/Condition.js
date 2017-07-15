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
   * Initialization method.
   * @method initialize
   * @constructor
   **/
  constructor(params) {
    super();
  }

};

/**
 * Node name. Default to `Condition`.
 * @property {String} name
 * @readonly
 **/
Condition.prototype.name = 'Condition';

/**
 * Node category. Default to `b3.CONDITION`.
 * @property {String} category
 * @readonly
 **/
Condition.prototype.category = CONDITION;
