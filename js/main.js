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


var bodyBizarre = document.querySelector('body');
var uploadInput = document.querySelector('.img-upload__input');
var imgEditing = document.querySelector('.img-upload__overlay');
var imgEditingCancel = imgEditing.querySelector('.img-upload__cancel');

var onImgEditingEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeImgEditing();
  }
};

// нормально ли указывать input, хотя кликаем мы по label?
uploadInput.addEventListener('click', function (evt) {
  evt.preventDefault();
  imgEditing.classList.remove('hidden');
  bodyBizarre.classList.add('modal-open');
  document.addEventListener('keydown', onImgEditingEscPress);
});

var closeImgEditing = function () {
  imgEditing.classList.add('hidden');
  bodyBizarre.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgEditingEscPress);
  // не работает:
  // filterList.removeEventListener('change', applyFilter);
  // а хотелось бы сбрасывать все фильтры после закрытия модального окна
};

imgEditingCancel.addEventListener('click', function () {
  closeImgEditing();
});

// eslint-disable-next-line no-unused-vars
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelSlider = document.querySelector('.img-upload__effect-level');
var previewOriginal = document.querySelector('#effect-none');
var uploadedImage = document.querySelector('.img-upload__preview img');
var filterList = document.querySelector('.effects__list');

if (previewOriginal.checked) {
  effectLevelSlider.classList.add('hidden');
}

var applyFilter = function (evt) {
  if (evt.target.value === 'none') {
    uploadedImage.setAttribute('class', '');
    effectLevelSlider.classList.add('hidden');
  } else {
    uploadedImage.setAttribute('class', 'effects__preview--' + evt.target.value);
    effectLevelSlider.classList.remove('hidden');
  }
};

filterList.addEventListener('change', applyFilter);


var hashtagInput = document.querySelector('.text-hashtags');
var hashtagRegex = /^#[A-Za-zА-Яа-я0-9]{2,20}$/i;
var hashtags = hashtagInput.split(' ');

// ниже - неудачная попытка валидировать хештеги.
// validity - это свойство всего инпута, мы не можем применить его к отдельным хэштегам?
// а значит - можем только указать пользователю, что где-то он ошибся, но не можем указать, в чем состоит ошибка?

hashtagInput.addEventListener('invalid', function () {
  for (var i = 0; i < hashtags.length; i++) {
    if (hashtagRegex.test(hashtags[i]) === false) {
      hashtagInput.setCustomValidity('В хэштеге допущена ошибка');
    } else {
      hashtagInput.setCustomValidity('');
    }
  }
});

