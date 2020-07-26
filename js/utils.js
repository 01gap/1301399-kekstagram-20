'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  var debounce = function (func) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        func.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var createRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.utils = {
    isEscEvent: isEscEvent,
    debounce: debounce,
    createRandomNum: createRandomNum,
  };
})();
