var util = (function() {
    'use strict';

    function isEmpty(str) {
        return (!str || /^\s*$/.test(str));
    }
  
    return {
      isEmpty: isEmpty
    };
  })();
  
  module.exports = util;
