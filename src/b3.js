/**
 * b3
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

this.b3 = this.b3 || {};

/**
 * Behavior3JS
 * ===========
 *
 * * * *
 * 
 * **Behavior3JS** is a Behavior Tree library written in JavaScript. It 
 * provides structures and algorithms that assist you in the task of creating 
 * intelligent agents for your game or application. Check it out some features 
 * of Behavior3JS:
 * 
 * - Based on the work of (Marzinotto et al., 2014), in which they propose a 
 *   **formal**, **consistent** and **general** definition of Behavior Trees;
 * - **Optimized to control multiple agents**: you can use a single behavior 
 *   tree instance to handle hundreds of agents;
 * - It was **designed to load and save trees in a JSON format**, in order to 
 *   use, edit and test it in multiple environments, tools and languages;
 * - A **cool visual editor** which you can access online;
 * - Several **composite, decorator and action nodes** available within the 
 *   library. You still can define your own nodes, including composites and 
 *   decorators;
 * - **Completely free**, the core module and the visual editor are all published
 *   under the MIT License, which means that you can use them for your open source
 *   and commercial projects;
 * - **Lightweight**, only 11.5KB!
 * 
 * Visit http://behavior3js.guineashots.com to know more!
 *
 * 
 * Core Classes and Functions
 * --------------------------
 * 
 * This library include the following core structures...
 *
 * **Public:**
 * 
 * - **BehaviorTree**: the structure that represents a Behavior Tree;
 * - **Blackboard**: represents a "memory" in an agent and is required to to 
 *   run a `BehaviorTree`;
 * - **Composite**: base class for all composite nodes;
 * - **Decorator**: base class for all decorator nodes;
 * - **Action**: base class for all action nodes;
 * - **Condition**: base class for all condition nodes;
 *
 * **Internal:**
 * 
 * 
 * - **Tick**: used as container and tracking object through the tree during 
 *   the tick signal;
 * - **BaseNode**: the base class that provide all common node features;
 * 
 * *Some classes are used internally on Behavior3JS, but you may need to access
 * its functionalities eventually, specially the `Tick` object.*
 *
 * 
 * Nodes Included 
 * --------------
 *
 * **Composite Nodes**: 
 * 
 * - Sequence;
 * - Priority;
 * - MemSequence;
 * - MemPriority;
 * 
 * 
 * **Decorators**: 
 * 
 * - Inverter;
 * - Limiter
 * - MaxTime;
 * - Repeater;
 * - RepeaterUntilFailure;
 * - RepeaterUntilSuccess;
 *
 * 
 * **Actions**:
 * 
 * - Succeeder;
 * - Failer;
 * - Error;
 * - Runner;
 * - Wait.
 * 
 * @module Behavior3JS
 * @main Behavior3JS
**/

(function() {
"use strict";

/**
 * List of all constants in Behavior3JS.
 *
 * @class Constants
**/

/**
 * Version of the library.
 * 
 * @property VERSION
 * @type {String}
 */
b3.VERSION   = '0.1.0';

/**
 * Returned when a criterion has been met by a condition node or an action node
 * has been completed successfully.
 * 
 * @property SUCCESS
 * @type {Integer}
 */
b3.SUCCESS   = 1;

/**
 * Returned when a criterion has not been met by a condition node or an action 
 * node could not finish its execution for any reason.
 * 
 * @property FAILURE
 * @type {Integer}
 */
b3.FAILURE   = 2;

/**
 * Returned when an action node has been initialized but is still waiting the 
 * its resolution.
 * 
 * @property FAILURE
 * @type {Integer}
 */
b3.RUNNING   = 3;

/**
 * Returned when some unexpected error happened in the tree, probably by a 
 * programming error (trying to verify an undefined variable). Its use depends 
 * on the final implementation of the leaf nodes.
 * 
 * @property ERROR
 * @type {Integer}
 */
b3.ERROR     = 4;


/**
 * Describes the node category as Composite.
 * 
 * @property COMPOSITE
 * @type {String}
 */
b3.COMPOSITE = 'composite';

/**
 * Describes the node category as Decorator.
 * 
 * @property DECORATOR
 * @type {String}
 */
b3.DECORATOR = 'decorator';

/**
 * Describes the node category as Action.
 * 
 * @property ACTION
 * @type {String}
 */
b3.ACTION    = 'action';

/**
 * Describes the node category as Condition.
 * 
 * @property CONDITION
 * @type {String}
 */
b3.CONDITION = 'condition';


/**
 * List of internal and helper functions in Behavior3JS.
 * 
 * @class Utils
**/


/**
 * This function is used to create unique IDs for trees and nodes.
 * 
 * (consult http://www.ietf.org/rfc/rfc4122.txt).
 *
 * @method createUUID
 * @return {String} A unique ID.
**/
b3.createUUID = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    // bits 12-15 of the time_hi_and_version field to 0010
    s[14] = "4";

    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/**
 * Class is a meta-factory function to create classes in JavaScript. It is a
 * shortcut for the CreateJS syntax style. By default, the class created by 
 * this function have an initialize function (the constructor). Optionally, you
 * can specify the inheritance by passing another class as parameter.
 *
 * By default, all classes created using this function, may receives only a
 * settings parameter as argument. This pattern is commonly used by jQuery and 
 * its plugins.
 *
 * Usage
 * -----
 *
 *     // Creating a simple class
 *     var BaseClass = b3.Class();
 *
 *     // Using inheritance
 *     var ChildClass = b3.Class(BaseClass);
 *
 *     // Defining the constructor
 *     ChildClass.prototype.initialize = function(settings) { ... }
 *
 * @method Class
 * @param {Object} [baseClass] The super class.
 * @return {Object} A new class.
**/
b3.Class = function(baseClass) {
    // create a new class
    var cls = function(params) {
        this.initialize(params);
    };
    
    // if base class is provided, inherit
    if (baseClass) {
        cls.prototype = Object.create(baseClass.prototype);
        cls.prototype.constructor = cls;
    }
    
    // create initialize if does not exist on baseClass
    if(!cls.prototype.initialize) {
        cls.prototype.initialize = function() {};
    }

    return cls;
}

})();