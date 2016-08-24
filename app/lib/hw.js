#!/bin/env node

(function() {
    'use strict';
    const fs = require('fs');
    
    let Hwutils = function() {
        if (!(this instanceof Hwutils)) return new Hwutils();
    };

    Hwutils.prototype.serial = function (callback) {
        fs.readFile("/proc/cpuinfo", "utf8", function (error, data) {
          if (error) {
            callback(error);
          } else {
            let lines = data.trim().split('\n');
            let lastLine = lines.slice(-1)[0];
            let serialStart=lastLine.length-16;
            let serialEnd=lastLine.length;
            let serial = lastLine.substring(serialStart, serialEnd);
            callback(null,serial);
          }
        });
      };

    module.exports = new Hwutils();

})();
