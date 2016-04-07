import {Class} from '../b3.functions';
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

export default Class(BaseNode, {

  /**
   * Node category. Default to `ACTION`.
   * @property {String} category
   * @readonly
   **/
  category: ACTION,

  /**
   * Initialization method.
   * @method initialize
   * @constructor
   **/
  initialize: function(params) {
    BaseNode.prototype.initialize.call(this);
  }
});
