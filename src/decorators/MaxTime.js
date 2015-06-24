/**
 * MaxTime
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
 * The MaxTime decorator limits the maximum time the node child can execute. 
 * Notice that it does not interrupt the execution itself (i.e., the child must
 * be non-preemptive), it only interrupts the node after a `RUNNING` status.
 *
 * @class MaxTime
 * @extends Decorator
**/
var MaxTime = b3.Class(b3.Decorator);

var p = MaxTime.prototype;

    /**
     * Node name. Default to `MaxTime`.
     *
     * @property name
     * @type {String}
     * @readonly
    **/
    p.name = 'MaxTime';

    /**
     * Node title. Default to `Max XXms`. Used in Editor.
     *
     * @property title
     * @type {String}
     * @readonly
    **/
    p.title = 'Max <maxTime>ms';

    /**
     * Node parameters.
     *
     * @property parameters
     * @type {String}
     * @readonly
    **/
    p.parameters = {'maxTime': 0};

    p.__Decorator_initialize = p.initialize;
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxTime** (*Integer*) Maximum time a child can execute.
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param {Object} settings Object with parameters.
     * @constructor
    **/
    p.initialize = function(settings) {
        settings = settings || {};

        this.__Decorator_initialize(settings);

        if (!settings.maxTime) {
            throw "maxTime parameter in MaxTime decorator is an obligatory " +
                  "parameter";
        }

        this.maxTime = settings.maxTime;
    };

    /**
     * Open method.
     *
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    p.open = function(tick) {
        var startTime = (new Date()).getTime();
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
    };
    
    /**
     * Tick method.
     *
     * @method tick
     * @param {Tick} tick A tick instance.
     * @returns {Constant} A state constant.
    **/
    p.tick = function(tick) {
        if (!this.child) {
            return b3.ERROR;
        }
        
        var currTime = (new Date()).getTime();
        var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
        
        var status = this.child._execute(tick);
        if (currTime - startTime > this.maxTime) {
            return b3.FAILURE;
        }
        
        return status;
    };

b3.MaxTime = MaxTime;

})();