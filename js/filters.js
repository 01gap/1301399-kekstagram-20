'use strict';
(function () {
  var RANDOM_COUNT = 10;

  var chooseRandomPics = function (data) {
    var randomPics = [];
    while (randomPics.length < RANDOM_COUNT) {
      var index = window.utils.createRandomNum(0, data.length - 1);
      if (randomPics.indexOf(data[index]) === -1) {
        randomPics.push(data[index]);
      }
    }
    return randomPics;
  };

  var getMostCommentedFirst = function (data) {
    var mostCommentedFirst = data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return mostCommentedFirst;
  };

  window.filters = {
    getMostCommentedFirst: getMostCommentedFirst,
    chooseRandomPics: chooseRandomPics
  };
})();
