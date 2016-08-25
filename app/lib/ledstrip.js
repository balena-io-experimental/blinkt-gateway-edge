#!/bin/env node

(function() {
    'use strict';

    const fs = require("fs");
    const Blinkt = require('node-blinkt');
    const leds = new Blinkt();

    let ledstrip = function() {
        if (!(this instanceof ledstrip)) return new ledstrip();
        this.initialized = false;
        this.colors = {};
    };

    ledstrip.prototype.init = function (callback) {
      let self = this;
      self.colorize(function() {
        leds.setup();
        leds.clearAll();
        self.initialized = true;
        callback();
      });
    };

    ledstrip.prototype.progress = function (value, color, callback) {
      let self = this;
      let pickedColor = self.colors[color];
      if (!self.initialized) {
        return false;
      }
      for (let i = 0; i < value; i++) {
        leds.setPixel(i, pickedColor[0],  pickedColor[1],  pickedColor[2], 0.5);
      }
      leds.sendUpdate();
      callback();
    };

    ledstrip.prototype.pixel = function (value, color, callback) {
      let self = this;
      let pickedColor = self.colors[color];
      if (!self.initialized) {
        return false;
      }
      leds.setPixel(value, pickedColor.r,  pickedColor.g,  pickedColor.b, 0.5);
      leds.sendUpdate();
      callback();
    };

    ledstrip.prototype.colorize = function (callback) {
      let self = this;
      fs.stat('/data/colors.json', function(err, stat) {
          if(err == null) {
              self.colors = JSON.parse(fs.readFileSync("/data/colors.json"));
          } else {
              self.colors = JSON.parse(fs.readFileSync("/assets/colors.json"));
          }
          callback();
      });
    };



    module.exports = ledstrip();

})();
