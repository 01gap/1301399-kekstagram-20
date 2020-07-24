'use strict';
(function () {
  var COMMENTS_COUNT = 5;
  var popup = document.querySelector('.big-picture');
  var previewBtnClose = popup.querySelector('.big-picture__cancel');
  var commentsList = document.querySelector('.social__comments');
  var fakeTemplate;
  var commentsArray;

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

  // var eraseComments = function () {
  //   while (commentsList.firstChild) {
  //     commentsList.removeChild(commentsList.lastChild);
  //   }
  // };

  var prepareFakeTemplate = function () {
    var commentsFromHtml = document.querySelectorAll('.social__comment');
    fakeTemplate = commentsList.removeChild(commentsFromHtml[0]);
    fakeTemplate.classList.add('hidden');
  };

  var insertComments = function (onePicDataComments) {
    // var commentsFromHtml = document.querySelectorAll('.social__comment');
    // fakeTemplate = commentsFromHtml[0];
    // fakeTemplate.classList.add('hidden');
    // while (commentsList.firstChild) {
    //   commentsList.removeChild(commentsList.lastChild);
    // }
    var fragmentComment = document.createDocumentFragment();

    for (var i = 0; i < onePicDataComments.length; i++) {
      var comment = onePicDataComments[i];
      var newItem = fakeTemplate.cloneNode(true);
      newItem.querySelector('.social__picture').src = comment.avatar;
      newItem.querySelector('.social__picture').alt = comment.name;
      newItem.querySelector('.social__text').textContent = comment.message;
      newItem.classList.remove('hidden');
      fragmentComment.appendChild(newItem);
    }
    commentsList.appendChild(fragmentComment);
  };
  var uploadMoreBtn = document.querySelector('.comments-loader');

  var showFiveComments = function (onePicDataComments) {
    commentsArray = onePicDataComments;
    var counter = 0;
    return function () {
      counter += COMMENTS_COUNT;
      var someComments = commentsArray.slice(counter, COMMENTS_COUNT);
      insertComments(someComments);
      if (commentsArray.length < COMMENTS_COUNT || commentsArray.length < counter) {
        uploadMoreBtn.classList.add('hidden');
      }
      return counter;
    };
  };

  uploadMoreBtn.addEventListener('click', function () {
    showFiveComments();
  });

  var showPopup = function (picture) {
    commentsArray = picture.comments;
    prepareFakeTemplate();
    // eraseComments();
    insertPictureInfo(picture);
    showFiveComments(commentsArray);
    openPopup();
    // document.querySelector('.social__comment-count').classList.add('hidden');
    // document.querySelector('.comments-loader').classList.add('hidden');
  };

  window.preview = {
    showPopup: showPopup
  };
})();
