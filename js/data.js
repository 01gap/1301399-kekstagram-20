'use strict';
// data.js модуль данных
(function () {
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;
  var Url = {
    GET: 'https://javascript.pages.academy/kekstagram/data',
    POST: 'https://javascript.pages.academy/kekstagram'
  };
  var xhr;

  var RANDOM_COUNT = 10;
  var filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');

  var createRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var createUniqueIndex = function (data) {
    var uniqueRandomNumbers = [];
    while (uniqueRandomNumbers.length < RANDOM_COUNT) {
      var index = createRandomNum(0, data.length);
      if (uniqueRandomNumbers.indexOf(index) === -1) {
        uniqueRandomNumbers.push(index);
      }
    }
    return uniqueRandomNumbers;
  };

  var createRandomData = function (data) {
    var randomData = [];
    var uniqueIndexes = createUniqueIndex(data);
    for (var i = 0; i < uniqueIndexes.length; i++) {
      var index = uniqueIndexes[i];
      randomData.push(data[index]);
    }
    return randomData;
  };

  var getMostCommentedFirst = function (data) {
    var mostCommentedFirst = data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return mostCommentedFirst;
  };

  var createXhr = function (onSuccess, onError) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
  };

  var getData = function (onSuccess, onError) {
    createXhr(onSuccess, onError);
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var saveData = function (formData, onSuccess, onError) {
    createXhr(onSuccess, onError);
    xhr.open('POST', Url.POST);
    xhr.send(formData);
  };

  var DEBOUNCE_INTERVAL = 500; // ms
  var debounce = function (func) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        func.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
  window.data = {
    getData: getData,
    saveData: saveData,
    createRandomData: createRandomData,
    getMostCommentedFirst: getMostCommentedFirst,
    debounce: debounce
  };
})();
