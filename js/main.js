'use strict';

// data.js модуль данных
(function () {
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Dub Dubom', 'Василий Петрович', 'Генрих IV', 'Анюта', 'Анонимус', 'Финдус'];

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

  window.data = {
    createImageUnit: createImageUnit
  };
})();


// picture.js модуль отрисовки миниатюры

(function () {
  var usersImagesContainer = document.querySelector('.pictures');
  var usersImageTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderAllImages = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 25; i++) {
      var image = window.data.createImageUnit(i + 1);
      var oneImage = usersImageTemplate.cloneNode(true);
      oneImage.querySelector('.picture__img').setAttribute('src', image.url);
      oneImage.querySelector('.picture__comments').textContent = image.comments.length;
      oneImage.querySelector('.picture__likes').textContent = image.likes;
      fragment.appendChild(oneImage);
    }
    usersImagesContainer.appendChild(fragment);
  };
  renderAllImages();
})();

// form.js модуль работы с формой

(function () {
  var bodyBizarre = document.querySelector('body');
  var imgEditing = document.querySelector('.img-upload__overlay');
  var imgEditingCancel = imgEditing.querySelector('.img-upload__cancel');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var uploadedImage = document.querySelector('.img-upload__preview img');
  // var hashtagInput = document.querySelector('.text__hashtags');
  var uploadComment = document.querySelector('.text__description');

  var onImgEditingEscPress = function (evt) {
    if (evt.key === 'Escape' && document.activeElement !== uploadComment && document.activeElement !== hashtagInput) {
      evt.preventDefault();
      closeImgEditing();
    }
  };

  imgUploadInput.addEventListener('change', function () {
    imgEditing.classList.remove('hidden');
    bodyBizarre.classList.add('modal-open');
    document.addEventListener('keydown', onImgEditingEscPress);
    if (previewOriginal.checked) {
      effectLevelSlider.classList.add('hidden');
    }
  });

  var closeImgEditing = function () {
    imgEditing.classList.add('hidden');
    bodyBizarre.classList.remove('modal-open');
    document.removeEventListener('keydown', onImgEditingEscPress);
  };

  imgEditingCancel.addEventListener('click', function () {
    closeImgEditing();
  });

  // eslint-disable-next-line no-unused-vars
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var previewOriginal = document.querySelector('#effect-none');
  var filterList = document.querySelector('.effects__list');


  var onChangeApplyFilter = function (evt) {
    if (evt.target.value === 'none') {
      uploadedImage.setAttribute('class', '');
      effectLevelSlider.classList.add('hidden');
    } else {
      uploadedImage.setAttribute('class', 'effects__preview--' + evt.target.value);
      effectLevelSlider.classList.remove('hidden');
    }
  };

  filterList.addEventListener('change', onChangeApplyFilter);


  var form = document.querySelector('.img-upload__form');
  var buttonSubmit = document.querySelector('.img-upload__submit');
  var hashtagInput = document.querySelector('.text__hashtags');

  buttonSubmit.addEventListener('click', function (evt) {
    if (hashtagInput.value !== '') {
      var hashtags = hashtagInput.value.trim().split(' ');
      var hashtagRegex = /^#[A-ZА-Я0-9ё]{1,19}$/i;
      for (var i = 0; i < hashtags.length; i++) {
        if (!hashtagRegex.test(hashtags[i])) {
          hashtagInput.setCustomValidity('ошибка');
          evt.preventDefault();
        } else {
          hashtagInput.setCustomValidity('');
        }
      }
    }
  });
})();


