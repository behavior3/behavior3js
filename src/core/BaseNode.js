this.b3 = this.b3 || {};

(function() {
  "use strict";

  /**
   * The BaseNode class is used as super class to all nodes in BehaviorJS. It 
   * comprises all common variables and methods that a node must have to execute.
   *
   * **IMPORTANT:** Do not inherit from this class, use `b3.Composite`, 
   * `b3.Decorator`, `b3.Action` or `b3.Condition`, instead.
   *
   * The attributes are specially designed to serialization of the node in a JSON
   * format. In special, the `parameters` attribute can be set into the visual 
   * editor (thus, in the JSON file), and it will be used as parameter on the 
   * node initialization at `BehaviorTree.load`.
   * 
   * BaseNode also provide 5 callback methods, which the node implementations can
   * override. They are `enter`, `open`, `tick`, `close` and `exit`. See their 
   * documentation to know more. These callbacks are called inside the `_execute`
   * method, which is called in the tree traversal.
   * 
   * @class BaseNode
  **/
  var BaseNode = b3.Class();

  var p = BaseNode.prototype;

  /**
   * Node ID.
   *
   * @property id
   * @type {String}
   * @readonly
  **/

  /**
   * Node name. Must be a unique identifier, preferable the same name of the 
   * class. You have to set the node name in the prototype.
   *
   * @property name
   * @type {String}
   * @readonly
  **/
  p.name = null;

  /**
   * Node category. Must be `b3.COMPOSITE`, `b3.DECORATOR`, `b3.ACTION` or 
   * `b3.CONDITION`. This is defined automatically be inheriting the 
   * correspondent class.
   *
   * @property category
   * @type constant
   * @readonly
  **/
  p.category = null;

  /**
   * Node title.
   *
   * @property title
   * @type {String}
   * @optional
   * @readonly
  **/
  p.title = null;

  /**
   * Node description.
   *
   * @property description
   * @type {String}
   * @optional
   * @readonly
  **/
  p.description = null;

  /**
   * A dictionary (key, value) describing the node parameters. Useful for 
   * defining parameter values in the visual editor. Note: this is only 
   * useful for nodes when loading trees from JSON files.
   *
   * @property parameters
   * @type {Object}
   * @readonly
  **/
  p.parameters = null;

  /**
   * A dictionary (key, value) describing the node properties. Useful for 
   * defining custom variables inside the visual editor.
   *
   * @property properties
   * @type {Object}
   * @readonly
  **/
  p.properties = null;

  /**
   * Initialization method.
   *
   * @method initialize
   * @constructor
  **/
  p.initialize = function() {
    this.id          = b3.createUUID();
    this.title       = this.title || this.name;
    this.description = '';
    this.parameters  = {};
    this.properties  = {};
  };

  /**
   * This is the main method to propagate the tick signal to this node. This 
   * method calls all callbacks: `enter`, `open`, `tick`, `close`, and 
   * `exit`. It only opens a node if it is not already open. In the same 
   * way, this method only close a node if the node  returned a status 
   * different of `b3.RUNNING`.
   *
   * @method _execute
   * @param {Tick} tick A tick instance.
   * @return {Constant} The tick state.
   * @protected
  **/
  p._execute = function(tick) {
    /* ENTER */
    this._enter(tick);

    /* OPEN */
    if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) {
        this._open(tick);
    }

    /* TICK */
    var status = this._tick(tick);

    /* CLOSE */
    if (status !== b3.RUNNING) {
        this._close(tick);
    }

    /* EXIT */
    this._exit(tick);

    return status;
  };

  /**
   * Wrapper for enter method.
   *
   * @method _enter
   * @param {Tick} tick A tick instance.
   * @protected
  **/
  p._enter = function(tick) {
    tick._enterNode(this);
    this.enter(tick);
  };

  /**
   * Wrapper for open method.
   *
   * @method _open
   * @param {Tick} tick A tick instance.
   * @protected
  **/
  p._open  = function(tick) {
    tick._openNode(this);
    tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
    this.open(tick);
  };

  /**
   * Wrapper for tick method.
   *
   * @method _tick
   * @param {Tick} tick A tick instance.
   * @return {Constant} A state constant.
   * @protected
  **/
  p._tick  = function(tick) {
    tick._tickNode(this);
    return this.tick(tick);
  };

  /**
   * Wrapper for close method.
   *
   * @method _close
   * @param {Tick} tick A tick instance.
   * @protected
  **/
  p._close = function(tick) {
    tick._closeNode(this);
    tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
    this.close(tick);
  };

  /**
   * Wrapper for exit method.
   *
   * @method _exit
   * @param {Tick} tick A tick instance.
   * @protected
  **/
  p._exit  = function(tick) {
    tick._exitNode(this);
    this.exit(tick);
  };

  /**
   * Enter method, override this to use. It is called every time a node is 
   * asked to execute, before the tick itself.
   *
   * @method enter
   * @param {Tick} tick A tick instance.
  **/
  p.enter = function(tick) {};

  /**
   * Open method, override this to use. It is called only before the tick 
   * callback and only if the not isn't closed.
   *
   * Note: a node will be closed if it returned `b3.RUNNING` in the tick.
   *
   * @method open
   * @param {Tick} tick A tick instance.
  **/
  p.open  = function(tick) {};

  /**
   * Tick method, override this to use. This method must contain the real 
   * execution of node (perform a task, call children, etc.). It is called
   * every time a node is asked to execute.
   *
   * @method tick
   * @param {Tick} tick A tick instance.
  **/
  p.tick  = function(tick) {};

  /**
   * Close method, override this to use. This method is called after the tick
   * callback, and only if the tick return a state different from 
   * `b3.RUNNING`.
   *
   * @method close
   * @param {Tick} tick A tick instance.
  **/
  p.close = function(tick) {};

  /**
   * Exit method, override this to use. Called every time in the end of the 
   * execution.
   *
   * @method exit
   * @param {Tick} tick A tick instance.
  **/
  p.exit  = function(tick) {};
  
  b3.BaseNode = BaseNode;

})();