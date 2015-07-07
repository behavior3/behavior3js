/**
 * List of internal and helper functions in Behavior3JS.
 * 
 * @module functions
**/

(function() {
  "use strict";
  
  /**
   * This function is used to create unique IDs for trees and nodes.
   * 
   * (consult http://www.ietf.org/rfc/rfc4122.txt).
   *
   * @class createUUID
   * @constructor
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
  };

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
   * @class Class
   * @constructor
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
  };
})();
