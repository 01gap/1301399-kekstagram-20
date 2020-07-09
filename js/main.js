'use strict';

// main.js
(function () {
  var usersImagesContainer = document.querySelector('.pictures');
  var pictures = window.data.generateData();

  window.addEventListener('load', function () {
    window.picture.renderAllImages(pictures);
  });

  usersImagesContainer.addEventListener('click', function (evt) {
    window.preview.onClickShowPreview(evt, pictures);
  });

  usersImagesContainer.addEventListener('keydown', function (evt) {
    window.preview.onEnterShowPreview(evt, pictures);
  });
})();
