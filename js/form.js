'use strict';

// form.js модуль работы с формой

(function () {
  var MAX_EFFECT_VALUE = 100;
  var imgEditing = document.querySelector('.img-upload__overlay');
  var imgEditingCancel = imgEditing.querySelector('.img-upload__cancel');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var uploadedImage = document.querySelector('.img-upload__preview img');
  var uploadComment = document.querySelector('.text__description');
  var buttonSubmit = document.querySelector('.img-upload__submit');
  var hashtagInput = document.querySelector('.text__hashtags');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var previewOriginal = document.querySelector('#effect-none');
  var filterList = document.querySelector('.effects__list');

  var effectLine = document.querySelector('.effect-level__line');
  var effectPin = effectLine.querySelector('.effect-level__pin');
  var effectDepth = effectLine.querySelector('.effect-level__depth');
  var effectValue = document.querySelector('.effect-level__value');
  var currentEffect;

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);
  var successBtn = successMessage.querySelector('.success__button');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var errorBtn = successMessage.querySelector('.error__button');


  var GRAYSCALE = {
    name: 'grayscale',
    min: 0,
    max: 1,
    unit: ''
  };
  var SEPIA = {
    name: 'sepia',
    min: 0,
    max: 1,
    unit: ''
  };

  var INVERT = {
    name: 'invert',
    min: 0,
    max: 100,
    unit: '%'
  };

  var BLUR = {
    name: 'blur',
    min: 0,
    max: 3,
    unit: 'px'
  };

  var BRIGHTNESS = {
    name: 'brightness',
    min: 1,
    max: 2,
    unit: ''
  };

  var FILTERS = {
    chrome: GRAYSCALE,
    sepia: SEPIA,
    marvin: INVERT,
    phobos: BLUR,
    heat: BRIGHTNESS
  };

  var closeImgEditing = function () {
    imgEditing.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImgEditingEscPress);
  };

  var onImgEditingEscPress = function (evt) {
    if (evt.key === 'Escape' && document.activeElement !== uploadComment && document.activeElement !== hashtagInput) {
      evt.preventDefault();
      closeImgEditing();
    }
  };

  imgUploadInput.addEventListener('change', function () {
    imgEditing.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onImgEditingEscPress);
    if (previewOriginal.checked) {
      effectLevelSlider.classList.add('hidden');
    }
  });

  imgEditingCancel.addEventListener('click', function () {
    closeImgEditing();
  });

  var onChangeApplyFilter = function (evt) {
    currentEffect = evt.target.value;
    if (currentEffect === 'none') {
      uploadedImage.setAttribute('class', '');
      removeEffectValue();
      effectLevelSlider.classList.add('hidden');
    } else {
      uploadedImage.setAttribute('class', 'effects__preview--' + currentEffect);
      effectLevelSlider.classList.remove('hidden');
      effectValue.value = MAX_EFFECT_VALUE;
      effectPin.style.left = MAX_EFFECT_VALUE + '%';
      effectDepth.style.width = MAX_EFFECT_VALUE + '%';
      addEffectValue(currentEffect);
      effectPin.addEventListener('mousedown', onMouseDown);
    }
  };

  filterList.addEventListener('change', onChangeApplyFilter);

  var isUniqueArr = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (i !== j) {
          if (arr[i].toLowerCase() === arr[j].toLowerCase()) {
            return false;
          }
        }
      }
    }
    return true;
  };


  buttonSubmit.addEventListener('click', function () {
    hashtagInput.setCustomValidity('');
    if (hashtagInput.value !== '') {
      var hashtags = hashtagInput.value.trim().split(' ');
      var hashtagRegex = /^#[A-ZА-Я0-9ё]{1,19}$/i;
      for (var i = 0; i < hashtags.length; i++) {
        if (!hashtagRegex.test(hashtags[i])) {
          hashtagInput.setCustomValidity('Хэштег должен начинаться с "#" и содержать от 1 до 19 букв и/или цифр (знаки пунктуации, пробелы и спецсимволы не допускаются)');
          break;
        } else if (!isUniqueArr(hashtags)) {
          hashtagInput.setCustomValidity('Хэштеги не должны повторяться');
          break;
        } else if (hashtags.length >= 5) {
          hashtagInput.setCustomValidity('Нужно не более пяти хэштегов');
          break;
        }
      }
    }
  });

  var addEffectValue = function (effect) {
    var ratio = effectValue.value / 100;
    uploadedImage.style.filter = FILTERS[effect].name + '(' + (FILTERS[effect].min + ratio * (FILTERS[effect].max - FILTERS[effect].min)) + FILTERS[effect].unit + ')';
  };

  var removeEffectValue = function () {
    uploadedImage.style.filter = '';
  };

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var line = effectLine.getBoundingClientRect();
      var pinCoordX = moveEvt.clientX - line.x;
      var restrictedCoordX = Math.max(0, Math.min(line.width, pinCoordX));
      effectPin.style.left = restrictedCoordX + 'px';
      effectDepth.style.width = restrictedCoordX + 'px';
      var depthPercentage = Math.round(restrictedCoordX * 100 / line.width);
      effectValue.value = depthPercentage;
      addEffectValue(currentEffect);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  var main = document.querySelector('main');

  var onPostDataError = function (message) {
    console.log(message);
    imgEditing.classList.add('hidden');
    main.appendChild(errorMessage);
    errorMessage.addEventListener('keydown', onErrorMessageEscPress);
  };

  var onErrorMessageEscPress = function (evt) {
    if (evt.key === 'Esc') {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  var closeErrorMessage = function () {
    errorMessage.classList.add('hidden');
    errorMessage.removeEventListener('keydown', onErrorMessageEscPress);
  };

  errorBtn.addEventListener('click', function () {
    closeErrorMessage();
  });

  var onPostDataSuccess = function (data) {
    console.log(data);
    imgEditing.classList.add('hidden');
    main.appendChild(successMessage);
    successMessage.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('mouseup', onClickOutsideCloseSuccessMessage);
  };

  var onSuccessMessageEscPress = function (evt) {
    if (evt.key === 'Esc') {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  var closeSuccessMessage = function () {
    successMessage.classList.add('hidden');
    successMessage.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('mouseup', onClickOutsideCloseSuccessMessage);
  };

  successBtn.addEventListener('click', function () {
    closeSuccessMessage();
  });


  var onClickOutsideCloseSuccessMessage = function (evt) {
    if (evt.target !== successMessage) {
      closeSuccessMessage();
    }
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.data.postData(formData, onPostDataSuccess, onPostDataError);
  });
})();
