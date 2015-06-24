/**
 * Action
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
 * Action is the base class for all action nodes. Thus, if you want to 
 * create new custom action nodes, you need to inherit from this class. 
 *
 * For example, take a look at the Runner action:
 * 
 *     var Runner = b3.Class(b3.Action);
 *     var p = Runner.prototype;
 *     
 *         p.name = 'Runner';
 *     
 *         p.tick = function(tick) {
 *             return b3.RUNNING;
 *         }
 *
 * @class Action
 * @extends BaseNode
**/
var Action = b3.Class(b3.BaseNode);

var p = Action.prototype;

    /**
     * Node category. Default to `b3.ACTION`.
     *
     * @property category
     * @type {String}
     * @readonly
    **/
    p.category = b3.ACTION;

    p.__BaseNode_initialize = p.initialize;
    /**
     * Initialization method.
     *
     * @method initialize
     * @constructor
    **/
    p.initialize = function() {
        this.__BaseNode_initialize();
    }

b3.Action = Action;

})();