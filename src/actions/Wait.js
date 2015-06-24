/**
 * Wait
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
 * Wait a few seconds.
 *
 * @class Wait
 * @extends Action
**/
var Wait = b3.Class(b3.Action);

var p = Wait.prototype;
    
    /**
     * Node name. Default to `Wait`.
     *
     * @property name
     * @type {String}
     * @readonly
    **/
    p.name = 'Wait';

    /**
     * Node title. Default to `Wait XXms`. Used in Editor.
     *
     * @property title
     * @type {String}
     * @readonly
    **/
    p.title = 'Wait <milliseconds>ms';

    /**
     * Node parameters.
     *
     * @property parameters
     * @type {String}
     * @readonly
    **/
    p.parameters = {'milliseconds': 0};

    p.__Action_initialize = p.initialize;
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **milliseconds** (*Integer*) Maximum time, in milliseconds, a child
     *                                can execute.
     *
     * @method initialize
     * @param {Object} settings Object with parameters.
     * @constructor
    **/
    p.initialize = function(settings) {
        settings = settings || {};

        this.__Action_initialize();

        this.endTime = settings.milliseconds || 0;
    }

    /**
     * Open method.
     *
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    p.open = function(tick) {
        var startTime = (new Date()).getTime();
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     *
     * @method tick
     * @param {Tick} tick A tick instance.
     * @returns {Constant} A state constant.
    **/
    p.tick = function(tick) {
        var currTime = (new Date()).getTime();
        var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
        
        if (currTime - startTime > this.endTime) {
            return b3.SUCCESS;
        }
        
        return b3.RUNNING;
    }

b3.Wait = Wait;

})();