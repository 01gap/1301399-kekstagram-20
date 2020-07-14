'use strict';

// form.js модуль работы с формой

(function () {
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

  var appliedFilter;
  var onChangeApplyFilter = function (evt) {
    appliedFilter = evt.target.value;
    if (appliedFilter === 'none') {
      uploadedImage.setAttribute('class', '');
      effectLevelSlider.classList.add('hidden');
    } else {
      uploadedImage.setAttribute('class', 'effects__preview--' + appliedFilter);
      effectLevelSlider.classList.remove('hidden');
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

  var effectLine = document.querySelector('.effect-level__line');
  var effectPin = effectLine.querySelector('.effect-level__pin');
  var effectDepth = effectLine.querySelector('.effect-level__depth');
  var effectValue = document.querySelector('.effect-level__value');
  var GRAYSCALE = {
    min: 0,
    max: 1,
    unit: ''
  };
  var SEPIA = {
    min: 0,
    max: 1,
    unit: ''
  };

  var INVERT = {
    min: 0,
    max: 100,
    unit: '%'
  };

  var BLUR = {
    min: 0,
    max: 3,
    unit: 'px'
  };

  var BRIGHTNESS = {
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

  var addFilterValue = function (effect, ratio) {
    uploadedImage.style.filter = effect + '(' + FILTERS.effect.min + ratio * (FILTERS.effect.max - FILTERS.effect.min) + FILTERS.effect.unit + ')';
  };


  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var pinStart = effectPin.getBoundingClientRect();
    var line = effectLine.getBoundingClientRect();
    var pinStartRelX = pinStart.x - line.x;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = moveEvt.clientX - pinStart.x;
      var relCoordX = pinStartRelX + shiftX;
      var restrictedCoordX = Math.max(0, Math.min(line.width, relCoordX));
      effectPin.style.left = restrictedCoordX + 'px';
      effectDepth.style.width = restrictedCoordX + 'px';
      var depthPercentage = Math.round(restrictedCoordX * 100 / line.width);
      var depthRatio = depthPercentage / 100;
      effectValue.value = depthPercentage;
      // главный вопрос: как получить (куда сохранить) имя примененного
      // эффекта из onChangeApplyFilter, чтобы использовать его здесь ?
      // addFilterValue(appliedFilter, depthRatio);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
