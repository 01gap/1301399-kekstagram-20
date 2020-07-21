'use strict';

// main.js
(function () {
  var onGetDataSuccess = function (data) {
    window.picture.renderAllImages(data);
  };

  window.addEventListener('load', function () {
    window.data.getData(onGetDataSuccess, function () {});
  });

})();
