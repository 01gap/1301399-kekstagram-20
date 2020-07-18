'use strict';

// main.js
(function () {
  // var onGetDataError = function (message) {
  // // console.error(message);
  // };
  var onGetDataSuccess = function (data) {
  // console.log(data);
    window.picture.renderAllImages(data);
  };

  window.addEventListener('load', function () {
    window.data.getData('https://javascript.pages.academy/kekstagram/data', onGetDataSuccess, function () {});
  });

})();
