'use strict';
(function () {
  var COMMENTS_COUNT = 5;
  var popup = document.querySelector('.big-picture');
  var previewBtnClose = popup.querySelector('.big-picture__cancel');
  var commentsList = document.querySelector('.social__comments');
  var currentComment = document.querySelector('.social__comment-current-comment');
  var uploadMoreBtn = document.querySelector('.comments-loader');
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
    window.utils.isEscEvent(evt, closePopup);
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

  var eraseComments = function () {
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.lastChild);
    }
  };

  var prepareFakeTemplate = function () {
    var commentsFromHtml = document.querySelectorAll('.social__comment');
    fakeTemplate = commentsList.removeChild(commentsFromHtml[0]);
    fakeTemplate.classList.add('hidden');
  };

  var insertComments = function (onePicDataComments) {
    var fragmentComment = document.createDocumentFragment();
    onePicDataComments.forEach(function (comment) {
      var newItem = fakeTemplate.cloneNode(true);
      newItem.querySelector('.social__picture').src = comment.avatar;
      newItem.querySelector('.social__picture').alt = comment.name;
      newItem.querySelector('.social__text').textContent = comment.message;
      newItem.classList.remove('hidden');
      fragmentComment.appendChild(newItem);
    });
    commentsList.appendChild(fragmentComment);
  };

  var showFiveComments = function (onePicDataComments) {
    commentsArray = onePicDataComments;
    var counter = 0;
    var onClickShowComments = function () {
      var someComments = commentsArray.slice(counter, counter + COMMENTS_COUNT);
      insertComments(someComments);
      counter += COMMENTS_COUNT;
      if (commentsArray.length <= COMMENTS_COUNT || commentsArray.length <= counter) {
        uploadMoreBtn.classList.add('hidden');
        uploadMoreBtn.removeEventListener('click', onClickShowComments);
      }
      currentComment.textContent = Math.min(counter, onePicDataComments.length);
      return counter;
    };
    uploadMoreBtn.addEventListener('click', onClickShowComments);
    return onClickShowComments;
  };

  var showPopup = function (picture) {
    uploadMoreBtn.classList.remove('hidden');
    commentsArray = picture.comments;
    prepareFakeTemplate();
    eraseComments();
    insertPictureInfo(picture);
    var showFiveFn = showFiveComments(commentsArray);
    showFiveFn();
    openPopup();
  };

  window.preview = {
    showPopup: showPopup,
  };
})();
