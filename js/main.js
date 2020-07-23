'use strict';

// main.js
(function () {
  var allPics;
  var btnRandom = document.querySelector('#filter-random');
  var btnDiscussed = document.querySelector('#filter-discussed');
  var btnDefault = document.querySelector('#filter-default');

  var onGetDataSuccess = function (data) {
    allPics = data;
    window.picture.renderAllImages(data);
  };

  btnRandom.addEventListener('click', function () {
    var randomPics = window.data.createRandomData(allPics);
    window.data.debounce(window.picture.renderAllImages(randomPics));
  });

  btnDiscussed.addEventListener('click', function () {
    var sortedPics = window.data.getMostCommentedFirst(allPics);
    window.data.debounce(window.picture.renderAllImages(sortedPics));
  });

  btnDefault.addEventListener('click', function () {
    window.data.debounce(window.picture.renderAllImages(allPics));
  });

  window.addEventListener('load', function () {
    window.data.getData(onGetDataSuccess, function () {});
  });

})();
