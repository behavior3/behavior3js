import {Class} from '../b3.functions';
import BaseNode from './BaseNode';
import {CONDITION} from '../constants';

/**
 * Condition is the base class for all condition nodes. Thus, if you want to
 * create new custom condition nodes, you need to inherit from this class.
 *
 * @class Condition
 * @extends BaseNode
 **/

export default Class(BaseNode, {

  /**
   * Node category. Default to `b3.CONDITION`.
   * @property {String} category
   * @readonly
   **/
  category: CONDITION,

  /**
   * Initialization method.
   * @method initialize
   * @constructor
   **/
  initialize: function(params) {
    BaseNode.prototype.initialize.call(this);
  }

});
