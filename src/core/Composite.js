import BaseNode from '../core/BaseNode';
import {COMPOSITE} from '../constants';

/**
 * Composite is the base class for all composite nodes. Thus, if you want to
 * create new custom composite nodes, you need to inherit from this class.
 *
 * When creating composite nodes, you will need to propagate the tick signal
 * to the children nodes manually. To do that, override the `tick` method and
 * call the `_execute` method on all nodes. For instance, take a look at how
 * the Sequence node inherit this class and how it call its children:
 *
 *     // Inherit from Composite, using the util function Class.
 *     var Sequence = Class(Composite, {
 *
 *       // Remember to set the name of the node.
 *       name: 'Sequence',
 *
 *       // Override the tick function
 *       tick(tick) {
 *
 *         // Iterates over the children
 *         for (var i=0; i<this.children.length; i++) {
 *
 *           // Propagate the tick
 *           var status = this.children[i]._execute(tick);
 *
 *           if (status !== SUCCESS) {
 *               return status;
 *           }
 *         }
 *
 *         return SUCCESS;
 *       }
 *     });
 *
 * @module b3
 * @class Composite
 * @extends BaseNode
 **/

export default class Composite extends BaseNode {

  /**
   * Initialization method.
   *
   * @method initialize
   * @constructor
   **/
  constructor(params = {}) {
    super();
    this.children = (params.children || []).slice(0);
  }
};

/**
 * Node category. Default to `b3.COMPOSITE`.
 *
 * @property category
 * @type {String}
 * @readonly
 **/
Composite.prototype.category = COMPOSITE;
