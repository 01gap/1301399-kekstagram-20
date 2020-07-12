'use strict';
(function () {
  var popup = document.querySelector('.big-picture');
  var previewBtnClose = popup.querySelector('.big-picture__cancel');

  var openPopup = function () {
    popup.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    popup.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  previewBtnClose.addEventListener('click', function () {
    closePopup();
  });

  var insertPictureInfo = function (onePicData) {
    var likesCount = document.querySelector('.likes-count');
    var commentsCount = document.querySelector('.comments-count');
    var caption = document.querySelector('.social__caption');
    var image = document.querySelector('.big-picture__img img');
    image.setAttribute('src', onePicData.url);
    likesCount.textContent = onePicData.likes;
    commentsCount.textContent = onePicData.comments.length;
    caption.textContent = onePicData.description;
  };

  var insertComments = function (onePicData) {
    var commentsList = document.querySelector('.social__comments');
    var twoComments = document.querySelectorAll('.social__comment');
    var fakeTemplate = twoComments[0];
    fakeTemplate.classList.add('hidden');
    if (commentsList.querySelector('li:not(.hidden)')) {
      while (commentsList.firstChild) {
        commentsList.removeChild(commentsList.lastChild);
      }
    }
    var fragmentComment = document.createDocumentFragment();

    for (var i = 0; i < onePicData.comments.length; i++) {
      var comment = onePicData.comments[i];
      var newItem = fakeTemplate.cloneNode(true);
      newItem.querySelector('.social__picture').src = comment.avatar;
      newItem.querySelector('.social__picture').alt = comment.name;
      newItem.querySelector('.social__text').textContent = comment.message;
      newItem.classList.remove('hidden');
      fragmentComment.appendChild(newItem);
    }
    commentsList.appendChild(fragmentComment);
  };

  var showPopup = function (picture) {
    insertPictureInfo(picture);
    insertComments(picture);
    openPopup();
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  };

  window.preview = {
    showPopup: showPopup
  };
})();
