import {Class, createUUID} from '../b3.functions';
import {RUNNING} from '../constants';

"use strict";

/**
 * The BaseNode class is used as super class to all nodes in BehaviorJS. It 
 * comprises all common variables and methods that a node must have to 
 * execute.
 *
 * **IMPORTANT:** Do not inherit from this class, use `Composite`, 
 * `Decorator`, `Action` or `Condition`, instead.
 *
 * The attributes are specially designed to serialization of the node in a 
 * JSON format. In special, the `parameters` attribute can be set into the 
 * visual editor (thus, in the JSON file), and it will be used as parameter 
 * on the node initialization at `BehaviorTree.load`.
 *
 * BaseNode also provide 5 callback methods, which the node implementations 
 * can override. They are `enter`, `open`, `tick`, `close` and `exit`. See 
 * their documentation to know more. These callbacks are called inside the 
 * `_execute` method, which is called in the tree traversal.
 *
 * @module b3
 * @class BaseNode
 **/

export default Class(null, {

  /**
   * Node ID.
   * @property {string} id
   * @readonly
   **/
  id: null,

  /**
   * Node name. Must be a unique identifier, preferable the same name of the 
   * class. You have to set the node name in the prototype.
   *
   * @property {String} name
   * @readonly
   **/
  name: null,

  /**
   * Node category. Must be `COMPOSITE`, `DECORATOR`, `ACTION` or 
   * `CONDITION`. This is defined automatically be inheriting the 
   * correspondent class.
   *
   * @property {CONSTANT} category
   * @readonly
   **/
  category: null,

  /**
   * Node title.
   * @property {String} title
   * @optional
   * @readonly
   **/
  title: null,

  /**
   * Node description.
   * @property {String} description
   * @optional
   * @readonly
   **/
  description: null,

  /**
   * A dictionary (key, value) describing the node parameters. Useful for 
   * defining parameter values in the visual editor. Note: this is only 
   * useful for nodes when loading trees from JSON files.
   *
   * **Deprecated since 0.2.0. This is too similar to the properties 
   * attribute, thus, this attribute is deprecated in favor to 
   * `properties`.**
   *
   * @property {Object} parameters
   * @deprecated since 0.2.0.
   * @readonly
   **/
  parameters: null,

  /**
   * A dictionary (key, value) describing the node properties. Useful for 
   * defining custom variables inside the visual editor.
   *
   * @property properties
   * @type {Object}
   * @readonly
   **/
  properties: null,

  /**
   * Initialization method.
   * @method initialize
   * @constructor
   **/
  initialize: function(params) {
    this.id          = createUUID();
    this.title       = this.title || this.name;
    this.description = '';
    this.parameters  = {};
    this.properties  = {};
  },

  /**
   * This is the main method to propagate the tick signal to this node. This 
   * method calls all callbacks: `enter`, `open`, `tick`, `close`, and 
   * `exit`. It only opens a node if it is not already open. In the same 
   * way, this method only close a node if the node  returned a status 
   * different of `RUNNING`.
   *
   * @method _execute
   * @param {Tick} tick A tick instance.
   * @return {Constant} The tick state.
   * @protected
   **/
  _execute: function(tick) {
    // ENTER 
    this._enter(tick);

    // OPEN 
    if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) {
      this._open(tick);
    }

    // TICK 
    var status = this._tick(tick);

    // CLOSE 
    if (status !== RUNNING) {
      this._close(tick);
    }

    // EXIT 
    this._exit(tick);

    return status;
  },

  /**
   * Wrapper for enter method.
   * @method _enter
   * @param {Tick} tick A tick instance.
   * @protected
   **/
  _enter: function(tick) {
    tick._enterNode(this);
    this.enter(tick);
  },

  /**
   * Wrapper for open method.
   * @method _open
   * @param {Tick} tick A tick instance.
   * @protected
   **/
  _open: function(tick) {
    tick._openNode(this);
    tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
    this.open(tick);
  },

  /**
   * Wrapper for tick method.
   * @method _tick
   * @param {Tick} tick A tick instance.
   * @return {Constant} A state constant.
   * @protected
   **/
  _tick: function(tick) {
    tick._tickNode(this);
    return this.tick(tick);
  },

  /**
   * Wrapper for close method.
   * @method _close
   * @param {Tick} tick A tick instance.
   * @protected
   **/
  _close: function(tick) {
    tick._closeNode(this);
    tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
    this.close(tick);
  },

  /**
   * Wrapper for exit method.
   * @method _exit
   * @param {Tick} tick A tick instance.
   * @protected
   **/
  _exit: function(tick) {
    tick._exitNode(this);
    this.exit(tick);
  },

  /**
   * Enter method, override this to use. It is called every time a node is 
   * asked to execute, before the tick itself.
   *
   * @method enter
   * @param {Tick} tick A tick instance.
   **/
  enter: function(tick) {},

  /**
   * Open method, override this to use. It is called only before the tick 
   * callback and only if the not isn't closed.
   *
   * Note: a node will be closed if it returned `RUNNING` in the tick.
   *
   * @method open
   * @param {Tick} tick A tick instance.
   **/
  open: function(tick) {},

  /**
   * Tick method, override this to use. This method must contain the real 
   * execution of node (perform a task, call children, etc.). It is called
   * every time a node is asked to execute.
   *
   * @method tick
   * @param {Tick} tick A tick instance.
   **/
  tick: function(tick) {},

  /**
   * Close method, override this to use. This method is called after the tick
   * callback, and only if the tick return a state different from 
   * `RUNNING`.
   *
   * @method close
   * @param {Tick} tick A tick instance.
   **/
  close: function(tick) {},

  /**
   * Exit method, override this to use. Called every time in the end of the 
   * execution.
   *
   * @method exit
   * @param {Tick} tick A tick instance.
   **/
  exit: function(tick) {},
});
