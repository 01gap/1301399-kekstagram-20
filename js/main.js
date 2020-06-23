'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Dub Dubom', 'Василий Петрович', 'Генрих IV', 'Анюта', 'Анонимус', 'Финдус'];

var usersImagesTitle = document.querySelector('.pictures__title');
usersImagesTitle.classList.remove('visually-hidden');

var createImgMessage = function () {
  var msg = '';
  for (var k = 0; k < Math.floor(Math.random() * 2); k++) {
    msg += MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  }
  return msg;
};

var createImgComment = function () {
  var comments = [];
  for (var j = 0; j < Math.floor(Math.random() * 10); j++) {
    comments[j] = {
      avatar: 'img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg',
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      message: createImgMessage(), // MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
    };
  }
  return comments;
};

var createImageUnit = function (imgIndex) {
  var imageUnit = {
    url: 'photos/' + imgIndex + '.jpg',
    description: '',
    likes: Math.floor(Math.random() * (200 - 15 + 1) + 15),
    comments: createImgComment(),
  };
  return imageUnit;
};

var usersImagesContainer = document.querySelector('.pictures');
var usersImageTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderAllImages = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {
    var image = createImageUnit(i + 1);
    var oneImage = usersImageTemplate.cloneNode(true);
    oneImage.querySelector('.picture__img').setAttribute('src', image.url);
    oneImage.querySelector('.picture__comments').textContent = image.comments.length;
    oneImage.querySelector('.picture__likes').textContent = image.likes;
    fragment.appendChild(oneImage);
  }
  usersImagesContainer.appendChild(fragment);
};

renderAllImages();
