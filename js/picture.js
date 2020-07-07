'use strict';

// picture.js модуль отрисовки миниатюры

(function () {
  var usersImagesContainer = document.querySelector('.pictures');
  var usersImageTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = window.data.generateData();

  var renderAllImages = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      var oneImage = usersImageTemplate.cloneNode(true);
      oneImage.querySelector('.picture__img').setAttribute('src', pictures[i].url);
      oneImage.querySelector('.picture__comments').textContent = pictures[i].comments.length;
      oneImage.querySelector('.picture__likes').textContent = pictures[i].likes;
      fragment.appendChild(oneImage);
    }
    usersImagesContainer.appendChild(fragment);
  };

  window.picture = {
    renderAllImages: renderAllImages,
    pictures: pictures
  };
})();
