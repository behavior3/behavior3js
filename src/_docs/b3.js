/**
 * # Behavior3JS
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
 * - **Lightweight**!
 * 
 * Visit http://behavior3.com to know more!
 *
 * 
 * ## Core Classes and Functions
 * 
 * This library include the following core structures...
 *
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
 * 
 * **Internal:**
 * 
 * - **Tick**: used as container and tracking object through the tree during 
 *   the tick signal;
 * - **BaseNode**: the base class that provide all common node features;
 * 
 * *Some classes are used internally on Behavior3JS, but you may need to access
 * its functionalities eventually, specially the `Tick` object.*
 *
 * 
 * **Nodes:**
 *
 * - **Composite Nodes**: Sequence, Priority, MemSequence, MemPriority.
 * - **Decorators**: Inverter, Limiter, MaxTime, Repeater, 
 *   RepeaterUntilFailure, RepeaterUntilSuccess.
 * - **Actions**: Succeeder, Failer, Error, Runner, Wait.
 * 
 * @module b3
 * @main b3
**/