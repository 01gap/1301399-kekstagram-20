'use strict';

// main.js
(function () {
  var pictures = window.data.generateData();

  window.addEventListener('load', function () {
    window.picture.renderAllImages(pictures);
  });
})();
