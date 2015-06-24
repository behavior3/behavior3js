/**
 * Tick
 *
 * Copyright (c) 2014 Renato de Pontes Pereira.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
**/

/**
 * @module Behavior3JS
 **/

// namespace:
this.b3 = this.b3 || {};

(function() {
"use strict";

/**
 * A new Tick object is instantiated every tick by BehaviorTree. It is passed 
 * as parameter to the nodes through the tree during the traversal.
 * 
 * The role of the Tick class is to store the instances of tree, debug, target
 * and blackboard. So, all nodes can access these informations.
 * 
 * For internal uses, the Tick also is useful to store the open node after the 
 * tick signal, in order to let `BehaviorTree` to keep track and close them 
 * when necessary.
 *
 * This class also makes a bridge between nodes and the debug, passing the node
 * state to the debug if the last is provided.
 *
 * @class Tick
**/
var Tick = b3.Class();

var p = Tick.prototype;

    /**
     * The tree reference.
     * 
     * @property tree
     * @type {b3.BehaviorTree}
     * @readOnly
     */
    
    /**
     * The debug reference.
     * 
     * @property debug
     * @type {Object}
     * @readOnly
     */
    
    /**
     * The target object reference.
     * 
     * @property target
     * @type {Object}
     * @readOnly
     */
    
    /**
     * The blackboard reference.
     * 
     * @property blackboard
     * @type {Blackboard}
     * @readOnly
     */
    
    /**
     * The list of open nodes. Update during the tree traversal.
     * 
     * @property _openNodes
     * @type {Array}
     * @protected
     * @readOnly
     */
    
    /**
     * The number of nodes entered during the tick. Update during the tree 
     * traversal.
     * 
     * @property _nodeCount
     * @type {Integer}
     * @protected
     * @readOnly
     */
    
    /**
     * Initialization method.
     *
     * @method initialize
     * @constructor
    **/
    p.initialize = function() {
        // set by BehaviorTree
        this.tree       = null;
        this.debug      = null;
        this.target     = null;
        this.blackboard = null;

        // updated during the tick signal
        this._openNodes  = [];
        this._nodeCount  = 0;
    }

    /**
     * Called when entering a node (called by BaseNode).
     *
     * @method _enterNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    p._enterNode = function(node) {
        this._nodeCount++;
        this._openNodes.push(node);

        // TODO: call debug here
    }

    /**
     * Callback when opening a node (called by BaseNode). 
     *
     * @method _openNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    p._openNode = function(node) {
        // TODO: call debug here
    }

    /**
     * Callback when ticking a node (called by BaseNode).
     *
     * @method _tickNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    p._tickNode = function(node) {
        // TODO: call debug here
    }

    /**
     * Callback when closing a node (called by BaseNode).
     *
     * @method _closeNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    p._closeNode = function(node) {
        // TODO: call debug here
        this._openNodes.pop();
    }

    /**
     * Callback when exiting a node (called by BaseNode).
     *
     * @method _exitNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    p._exitNode = function(node) {
        // TODO: call debug here
    }

b3.Tick = Tick;

})();