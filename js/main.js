'use strict';

// main.js
(function () {
  var mainData;
  var btnRandom = document.querySelector('#filter-random');

  var onGetDataSuccess = function (data) {
    window.picture.renderAllImages(data);
    mainData = data;
  };

  btnRandom.addEventListener('click', function () {
    var randomData = window.data.createRandomData(mainData);
    window.picture.renderAllImages(randomData);
  });

  window.addEventListener('load', function () {
    window.data.getData(onGetDataSuccess, function () {});
  });

})();
