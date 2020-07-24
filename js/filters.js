'use strict';

(function () {
  var RANDOM_COUNT = 10;
  var createUniqueIndex = function (dataLength) {
    var uniqueRandomNumbers = [];
    while (uniqueRandomNumbers.length < RANDOM_COUNT) {
      var index = window.utils.createRandomNum(0, dataLength);
      if (uniqueRandomNumbers.indexOf(index) === -1) {
        uniqueRandomNumbers.push(index);
      }
    }
    return uniqueRandomNumbers;
  };

  var createRandomData = function (data) {
    var randomData = [];
    /*
    var dataShuffled = window.utils.shuffle(data);
    var randomData = dataShuffled.slice(0, 10);
    */
    var uniqueIndexes = createUniqueIndex(data.length);
    uniqueIndexes.forEach(function (index) {
      randomData.push(data[index]);
    });
    return randomData;
  };


  var getMostCommentedFirst = function (data) {
    var mostCommentedFirst = data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return mostCommentedFirst;
  };

  window.filters = {
    createRandomData: createRandomData,
    getMostCommentedFirst: getMostCommentedFirst,
  };
})();
