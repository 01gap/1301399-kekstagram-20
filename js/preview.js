'use strict';
(function () {
  var popup = document.querySelector('.big-picture');
  var image = document.querySelector('.big-picture img');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var caption = document.querySelector('.social__caption');
  var pictureInfo = window.picture.pictures[0];

  var commentsList = document.querySelector('.social__comments');
  var twoComments = document.querySelectorAll('.social__comment');
  var fakeTemplate = twoComments[0];
  commentsList.removeChild(twoComments[1]);
  fakeTemplate.classList.add('hidden');

  image.setAttribute('src', pictureInfo.url);
  popup.classList.remove('hidden');

  likesCount.textContent = pictureInfo.likes;
  commentsCount.textContent = pictureInfo.comments.length;
  caption.textContent = pictureInfo.description;

  var insertComments = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictureInfo.comments.length; i++) {
      var comment = pictureInfo.comments[i];
      var newItem = fakeTemplate.cloneNode(true);
      newItem.querySelector('.social__picture').src = comment.avatar;
      newItem.querySelector('.social__picture').alt = comment.name;
      newItem.querySelector('.social__text').textContent = comment.message;
      newItem.classList.remove('hidden');
      fragment.appendChild(newItem);
    }
    commentsList.appendChild(fragment);
  };

  insertComments();

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
})();
