#!/bin/env node

(function() {
    'use strict';

    const ledstrip = require('./lib/ledstrip.js');
    ledstrip.init(function init() {
      ledstrip.progress(7,'default',function progress() {
        console.log('Default light pattern applied');
      });
    });

})();
