this.b3 = this.b3 || {};

(function() {
  "use strict";
  
  b3.VERSION   = '0.2.0';
  
  // Returning status
  b3.SUCCESS   = 1;
  b3.FAILURE   = 2;
  b3.RUNNING   = 3;
  b3.ERROR     = 4;
  
  // Node categories
  b3.COMPOSITE = 'composite';
  b3.DECORATOR = 'decorator';
  b3.ACTION    = 'action';
  b3.CONDITION = 'condition';
})();