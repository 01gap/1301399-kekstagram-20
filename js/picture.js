'use strict';
(function () {
  var usersImagesContainer = document.querySelector('.pictures');
  var usersImageTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderImage = function (picture) {
    var oneImage = usersImageTemplate.cloneNode(true);
    oneImage.querySelector('.picture__img').setAttribute('src', picture.url);
    oneImage.querySelector('.picture__comments').textContent = picture.comments.length;
    oneImage.querySelector('.picture__likes').textContent = picture.likes;
    oneImage.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.preview.showPopup(picture);
    });
    return oneImage;
  };

  var renderAllImages = function (pictures) {
    var oldPics = usersImagesContainer.querySelectorAll('.picture');
    var fragment = document.createDocumentFragment();
    oldPics.forEach(function (pic) {
      usersImagesContainer.removeChild(pic);
    });
    pictures.forEach(function (picture) {
      fragment.appendChild(renderImage(picture));
    });
    usersImagesContainer.appendChild(fragment);
  };

  window.picture = {
    renderAllImages: window.utils.debounce(renderAllImages),
  };
})();
