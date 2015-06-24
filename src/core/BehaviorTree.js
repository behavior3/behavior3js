/**
 * BehaviorTree
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
 * The BehaviorTree class, as the name implies, represents the Behavior Tree 
 * structure.
 * 
 * There are two ways to construct a Behavior Tree: by manually setting the 
 * root node, or by loading it from a data structure (which can be loaded from 
 * a JSON). Both methods are shown in the examples below and better explained 
 * in the user guide.
 *
 * The tick method must be called periodically, in order to send the tick 
 * signal to all nodes in the tree, starting from the root. The method 
 * `BehaviorTree.tick` receives a target object and a blackboard as parameters.
 * The target object can be anything: a game agent, a system, a DOM object, 
 * etc. This target is not used by any piece of Behavior3JS, i.e., the target
 * object will only be used by custom nodes.
 * 
 * The blackboard is obligatory and must be an instance of `Blackboard`. This 
 * requirement is necessary due to the fact that neither `BehaviorTree` or any 
 * node will store the execution variables in its own object (e.g., the BT does
 * not store the target, information about opened nodes or number of times the 
 * tree was called). But because of this, you only need a single tree instance 
 * to control multiple (maybe hundreds) objects.
 * 
 * Manual construction of a Behavior Tree
 * --------------------------------------
 * 
 *     var tree = new b3.BehaviorTree();
 *  
 *     tree.root = new b3.Sequence({children:[
 *         new b3.Priority({children:[
 *             new MyCustomNode(),
 *             new MyCustomNode()
 *         ]}),
 *         ...
 *     ]});
 *     
 * 
 * Loading a Behavior Tree from data structure
 * -------------------------------------------
 * 
 *     var tree = new b3.BehaviorTree();
 *
 *     tree.load({
 *         'title'       : 'Behavior Tree title'
 *         'description' : 'My description'
 *         'root'        : 'node-id-1'
 *         'nodes'       : {
 *             'node-id-1' : {
 *                 'name'        : 'Priority', // this is the node type
 *                 'title'       : 'Root Node', 
 *                 'description' : 'Description', 
 *                 'children'    : ['node-id-2', 'node-id-3'], 
 *             },
 *             ...
 *         }
 *     })
 *     
 *
 * @class BehaviorTree
**/
var BehaviorTree = b3.Class();

var p = BehaviorTree.prototype;

    /**
     * The tree id, must be unique. By default, created with `b3.createUUID`.
     * 
     * @property id
     * @type {String}
     * @readOnly
     */
    
    /**
     * The tree title.
     *
     * @property title
     * @type {String}
     */
    
    /**
     * Description of the tree.
     *
     * @property description
     * @type {String}
     */
    
    /**
     * A dictionary with (key-value) properties. Useful to define custom 
     * variables in the visual editor.
     *
     * @property properties
     * @type {Object}
     */

    /**
     * The reference to the root node. Must be an instance of `b3.BaseNode`.
     *
     * @property root
     * @type {BaseNode}
     */

    /**
     * The reference to the debug instance.
     *
     * @property debug
     * @type {Object}
     */

    /**
     * Initialization method.
     *
     * @method initialize
     * @constructor
    **/
    p.initialize = function() {
        this.id          = b3.createUUID();
        this.title       = 'The behavior tree';
        this.description = 'Default description';
        this.properties  = {};
        this.root        = null;
        this.debug       = null;
    }

    /**
     * This method loads a Behavior Tree from a data structure, populating this
     * object with the provided data. Notice that, the data structure must 
     * follow the format specified by Behavior3JS. Consult the guide to know 
     * more about this format.
     *
     * You probably want to use custom nodes in your BTs, thus, you need to 
     * provide the `names` object, in which this method can find the nodes by 
     * `names[NODE_NAME]`. This variable can be a namespace or a dictionary, 
     * as long as this method can find the node by its name, for example:
     *
     *     //json
     *     ...
     *     'node1': {
     *       'name': MyCustomNode,
     *       'title': ...
     *     }
     *     ...
     *     
     *     //code
     *     var bt = new b3.BehaviorTree();
     *     bt.load(data, {'MyCustomNode':MyCustomNode})
     *     
     * 
     * @method load
     * @param {Object} data The data structure representing a Behavior Tree.
     * @param {Object} [names] A namespace or dict containing custom nodes.
    **/
    p.load = function(data, names) {
        names = names || {};

        this.title       = data.title || this.title;
        this.description = data.description || this.description;
        this.properties  = data.properties || this.properties;

        var nodes = {};
        // Create the node list (without connection between them)
        for (var id in data.nodes) {
            var spec = data.nodes[id];

            if (spec.name in names) {
                // Look for the name in custom nodes
                var cls = names[spec.name];
            } else if (spec.name in b3) {
                // Look for the name in default nodes
                var cls = b3[spec.name];
            } else {
                // Invalid node name
                throw EvalError('BehaviorTree.load: Invalid node name + "'+
                                 spec.name+'".');
            }

            var node = new cls(spec.properties);
            node.id = spec.id || node.id;
            node.title = spec.title || node.title;
            node.description = spec.description || node.description;
            node.properties = spec.properties || node.properties;

            nodes[id] = node;
        }

        // Connect the nodes
        for (var id in data.nodes) {
            var spec = data.nodes[id];
            var node = nodes[id];

            if (node.category === b3.COMPOSITE && spec.children) {
                for (var i=0; i<spec.children.length; i++) {
                    var cid = spec.children[i];
                    node.children.push(nodes[cid]);
                }
            } else if (node.category === b3.DECORATOR && spec.child) {
                node.child = nodes[spec.child];
            }
        }

        this.root = nodes[data.root];
    };

    /**
     * This method dump the current BT into a data structure.
     *
     * Note: This method does not record the current node parameters. Thus, 
     * it may not be compatible with load for now.
     * 
     * @method dump
     * @returns {Object} A data object representing this tree.
    **/
    p.dump = function() {
        var data = {};
        var customNames = [];

        data.title        = this.title;
        data.description  = this.description;
        data.root         = (this.root)? this.root.id:null;
        data.properties   = this.properties;
        data.nodes        = {};
        data.custom_nodes = [];

        if (!this.root) return data;

        var stack = [this.root];
        while (stack.length > 0) {
            var node = stack.pop();

            var spec = {};
            spec.id = node.id;
            spec.name = node.name;
            spec.title = node.title;
            spec.description = node.description;
            spec.properties = node.properties;
            spec.parameters = node.parameters;

            // verify custom node
            var nodeName = node.__proto__.name || node.name;
            if (!b3[nodeName] && customNames.indexOf(nodeName) < 0) {
                var subdata = {}
                subdata.name = nodeName;
                subdata.title = node.__proto__.title || node.title;
                subdata.category = node.category;

                customNames.push(nodeName);
                data.custom_nodes.push(subdata);
            }
            
            // store children/child
            if (node.category === b3.COMPOSITE && node.children) {
                var children = []
                for (var i=node.children.length-1; i>=0; i--) {
                    children.push(node.children[i].id);
                    stack.push(node.children[i]);
                }
                spec.children = children;
            } else if (node.category === b3.DECORATOR && node.child) {
                stack.push(node.child);
                spec.child = node.child.id;
            }

            data.nodes[node.id] = spec;
        }

        return data;
    };

    /**
     * Propagates the tick signal through the tree, starting from the root.
     * 
     * This method receives a target object of any type (Object, Array, 
     * DOMElement, whatever) and a `Blackboard` instance. The target object has
     * no use at all for all Behavior3JS components, but surely is important 
     * for custom nodes. The blackboard instance is used by the tree and nodes 
     * to store execution variables (e.g., last node running) and is obligatory
     * to be a `Blackboard` instance (or an object with the same interface).
     * 
     * Internally, this method creates a Tick object, which will store the 
     * target and the blackboard objects.
     * 
     * Note: BehaviorTree stores a list of open nodes from last tick, if these 
     * nodes weren't called after the current tick, this method will close them 
     * automatically.
     * 
     * @method tick
     * @param {Object} target A target object.
     * @param {Blackboard} blackboard An instance of blackboard object.
     * @returns {Constant} The tick signal state.
    **/
    p.tick = function(target, blackboard) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an ' +
                  'instance of b3.Blackboard';
        }

        /* CREATE A TICK OBJECT */
        var tick = new b3.Tick();
        tick.debug      = this.debug;
        tick.target     = target;
        tick.blackboard = blackboard;
        tick.tree       = this;

        /* TICK NODE */
        var state = this.root._execute(tick);

        /* CLOSE NODES FROM LAST TICK, IF NEEDED */
        var lastOpenNodes = blackboard.get('openNodes', this.id);
        var currOpenNodes = tick._openNodes.slice(0);

        // does not close if it is still open in this tick
        var start = 0;
        for (var i=0; i<Math.min(lastOpenNodes.length, currOpenNodes.length); i++) {
            start = i+1;
            if (lastOpenNodes[i] !== currOpenNodes[i]) {
                break;
            } 
        }

        // close the nodes
        for (var i=lastOpenNodes.length-1; i>=start; i--) {
            lastOpenNodes[i]._close(tick);
        }

        /* POPULATE BLACKBOARD */
        blackboard.set('openNodes', currOpenNodes, this.id);
        blackboard.set('nodeCount', tick._nodeCount, this.id);

        return state;
    };
   

b3.BehaviorTree = BehaviorTree;

})();