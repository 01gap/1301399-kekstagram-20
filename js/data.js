'use strict';
// data.js модуль данных
(function () {
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Dub Dubom', 'Василий Петрович', 'Генрих IV', 'Анюта', 'Анонимус', 'Финдус'];
  var PIC_COUNT = 25;

  var createRandom = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  };

  var createImgMessage = function () {
    var msg = '';
    for (var i = 0; i < createRandom(0, 1); i++) {
      msg += MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    }
    return msg;
  };

  var createImgComment = function () {
    var comments = [];
    for (var i = 0; i < createRandom(0, 9); i++) {
      comments[i] = {
        avatar: 'img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg',
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        message: createImgMessage(),
      };
    }
    return comments;
  };
  var createImageUnit = function (imgIndex) {
    var imageUnit = {
      url: 'photos/' + imgIndex + '.jpg',
      description: '',
      likes: createRandom(15, 200),
      comments: createImgComment(),
    };
    return imageUnit;
  };

  var generateData = function () {
    var pictures = [];
    for (var i = 0; i < PIC_COUNT; i++) {
      pictures.push(createImageUnit(i + 1));
    }
    return pictures;
  };

  window.data = {
    generateData: generateData
  };
})();
