/**
 * MemSequence
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
 * MemSequence is similar to Sequence node, but when a child returns a 
 * `RUNNING` state, its index is recorded and in the next tick the MemPriority 
 * call the child recorded directly, without calling previous children again.
 *
 * @class MemPriority
 * @extends Composite
**/
var MemSequence = b3.Class(b3.Composite);

var p = MemSequence.prototype

    /**
     * Node name. Default to `MemSequence`.
     *
     * @property name
     * @type {String}
     * @readonly
    **/
    p.name = 'MemSequence';

    /**
     * Open method.
     *
     * @method open
     * @param {b3.Tick} tick A tick instance.
    **/
    p.open = function(tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     *
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @returns {Constant} A state constant.
    **/
    p.tick = function(tick) {
        var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
        for (var i=child; i<this.children.length; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== b3.SUCCESS) {
                if (status === b3.RUNNING) {
                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                }
                return status;
            }
        }

        return b3.SUCCESS;
    }

b3.MemSequence = MemSequence;

})();