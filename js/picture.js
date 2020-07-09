'use strict';

// picture.js модуль отрисовки миниатюры

(function () {
  var usersImagesContainer = document.querySelector('.pictures');
  var usersImageTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderAllImages = function (manyPicsData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < manyPicsData.length; i++) {
      var oneImage = usersImageTemplate.cloneNode(true);
      oneImage.querySelector('.picture__img').setAttribute('src', manyPicsData[i].url);
      oneImage.querySelector('.picture__comments').textContent = manyPicsData[i].comments.length;
      oneImage.querySelector('.picture__likes').textContent = manyPicsData[i].likes;
      oneImage.querySelector('.picture__img').dataset.idnumber = i;
      oneImage.dataset.idnumber = i;
      fragment.appendChild(oneImage);
    }
    usersImagesContainer.appendChild(fragment);
  };

  window.picture = {
    renderAllImages: renderAllImages,
  };
})();
