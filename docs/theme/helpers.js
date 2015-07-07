module.exports = {
  path: function(str) {
    return str.substr(str.lastIndexOf("/")+1);
  },
  equal: function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
  },
  or: function() {
    var options = arguments[arguments.length-1];
    for (var i=0; i<arguments.length-1; i++) {
      if (arguments[i]) {
        return options.fn(this);
      }
    }

    return options.inverse(this);
  },
}