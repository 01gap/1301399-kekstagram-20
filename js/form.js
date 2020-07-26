'use strict';
(function () {
  var MAX_EFFECT_VALUE = 100;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imgEditing = document.querySelector('.img-upload__overlay');
  var imgEditingCancel = imgEditing.querySelector('.img-upload__cancel');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var uploadedImage = document.querySelector('.img-upload__preview img');
  var uploadComment = document.querySelector('.text__description');
  var buttonSubmit = document.querySelector('.img-upload__submit');
  var hashtagInput = document.querySelector('.text__hashtags');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var filterList = document.querySelector('.effects__list');
  var fileChooser = document.querySelector('.img-upload__input');

  var btnSmaller = document.querySelector('.scale__control--smaller');
  var btnBigger = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var currentScaleRatio;

  var effectLine = document.querySelector('.effect-level__line');
  var effectPin = effectLine.querySelector('.effect-level__pin');
  var effectDepth = effectLine.querySelector('.effect-level__depth');
  var effectValue = document.querySelector('.effect-level__value');
  var currentEffect;
  var message;

  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');

  var MessageType = {
    success: 'success',
    error: 'error'
  };

  var grayscale = {
    name: 'grayscale',
    min: 0,
    max: 1,
    unit: ''
  };
  var sepia = {
    name: 'sepia',
    min: 0,
    max: 1,
    unit: ''
  };

  var invert = {
    name: 'invert',
    min: 0,
    max: 100,
    unit: '%'
  };

  var blur = {
    name: 'blur',
    min: 0,
    max: 3,
    unit: 'px'
  };

  var brightness = {
    name: 'brightness',
    min: 1,
    max: 2,
    unit: ''
  };

  var Filters = {
    chrome: grayscale,
    sepia: sepia,
    marvin: invert,
    phobos: blur,
    heat: brightness
  };

  var ScaleRatio = {
    pace: 0.25,
    min: 0.25,
    max: 1,
    starting: 1
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        uploadedImage.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  var closeImgEditing = function () {
    imgEditing.classList.add('hidden');
    document.body.classList.remove('modal-open');
    btnSmaller.removeEventListener('click', onClickImgSmaller);
    btnBigger.removeEventListener('click', onClickImgBigger);
    document.removeEventListener('keydown', onImgEditingEscPress);
    form.reset();
  };

  var onImgEditingEscPress = function (evt) {
    if (document.activeElement !== uploadComment && document.activeElement !== hashtagInput) {
      window.utils.isEscEvent(evt, closeImgEditing);
    }
  };

  var setScaleValue = function () {
    uploadedImage.style = 'transform: scale(' + currentScaleRatio + ')';
    scaleValue.value = currentScaleRatio * 100 + '%';
  };

  var onClickImgSmaller = function () {
    if (currentScaleRatio > ScaleRatio.min) {
      currentScaleRatio -= ScaleRatio.pace;
      setScaleValue();
    }
  };

  var onClickImgBigger = function () {
    if (currentScaleRatio < ScaleRatio.max) {
      currentScaleRatio += ScaleRatio.pace;
      setScaleValue();
    }
  };

  var setOriginal = function () {
    uploadedImage.setAttribute('class', '');
    effectLevelSlider.classList.add('hidden');
    removeEffectValue();
  };

  imgUploadInput.addEventListener('change', function () {
    currentScaleRatio = ScaleRatio.starting;
    setScaleValue();
    setOriginal();
    document.body.classList.add('modal-open');
    imgEditing.classList.remove('hidden');
    btnSmaller.addEventListener('click', onClickImgSmaller);
    btnBigger.addEventListener('click', onClickImgBigger);
    document.addEventListener('keydown', onImgEditingEscPress);
  });

  imgEditingCancel.addEventListener('click', function () {
    closeImgEditing();
  });

  var addEffectValue = function (effect) {
    var ratio = effectValue.value / 100;
    uploadedImage.style.filter = Filters[effect].name + '(' + (Filters[effect].min + ratio * (Filters[effect].max - Filters[effect].min)) + Filters[effect].unit + ')';
  };

  var removeEffectValue = function () {
    uploadedImage.style.filter = '';
  };

  var onChangeApplyFilter = function (evt) {
    currentEffect = evt.target.value;
    if (currentEffect === 'none') {
      setOriginal();
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
    if (hashtagInput.value) {
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

  var closeMessage = function () {
    main.removeChild(message);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var onClickOutsideClose = function (evt) {
    if (evt.target === evt.currentTarget) {
      closeMessage();
    }
  };

  var onMessageEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeMessage);
  };

  var createPopupMessage = function (subj) {
    var template = document.querySelector('#' + subj).content.querySelector('.' + subj);
    message = template.cloneNode(true);
    var btn = message.querySelector('.' + subj + '__button');
    closeImgEditing();
    main.appendChild(message);
    document.addEventListener('keydown', onMessageEscPress);
    message.addEventListener('mouseup', onClickOutsideClose);

    btn.addEventListener('click', function () {
      closeMessage();
    });
  };

  var onSaveDataSuccess = function () {
    createPopupMessage(MessageType.success);
  };

  var onSaveDataError = function () {
    createPopupMessage(MessageType.error);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.saveData(new FormData(form), onSaveDataSuccess, onSaveDataError);
  });
})();
