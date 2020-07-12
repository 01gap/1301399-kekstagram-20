'use strict';

// form.js модуль работы с формой

(function () {
  var bodyBizarre = document.querySelector('body');
  var imgEditing = document.querySelector('.img-upload__overlay');
  var imgEditingCancel = imgEditing.querySelector('.img-upload__cancel');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var uploadedImage = document.querySelector('.img-upload__preview img');
  var uploadComment = document.querySelector('.text__description');
  var buttonSubmit = document.querySelector('.img-upload__submit');
  var hashtagInput = document.querySelector('.text__hashtags');
  // var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var previewOriginal = document.querySelector('#effect-none');
  var filterList = document.querySelector('.effects__list');

  var closeImgEditing = function () {
    imgEditing.classList.add('hidden');
    bodyBizarre.classList.remove('modal-open');
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
    bodyBizarre.classList.add('modal-open');
    document.addEventListener('keydown', onImgEditingEscPress);
    if (previewOriginal.checked) {
      effectLevelSlider.classList.add('hidden');
    }
  });

  imgEditingCancel.addEventListener('click', function () {
    closeImgEditing();
  });


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
})();
