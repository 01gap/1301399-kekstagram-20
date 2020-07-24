'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
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

  var shuffle = function (array) {
    var arrayCopy = [];
    var currentIndex = array.length - 1;
    while (currentIndex !== 0) {
      var randomIndex = createRandomNum(0, array.length);
      currentIndex -= 1;
      if (arrayCopy.indexOf(arrayCopy[randomIndex]) === -1) {
        arrayCopy.push(randomIndex);
      }
      // arrayCopy[currentIndex] = arrayCopy[randomIndex];
    }
    return arrayCopy;
  };

  window.utils = {
    debounce: debounce,
    createRandomNum: createRandomNum,
    shuffle: shuffle,
  };
})();
