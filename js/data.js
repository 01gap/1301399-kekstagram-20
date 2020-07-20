'use strict';
// data.js модуль данных
(function () {
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;

  var getData = function (onSuccess, onError) {
    var DATA_URL = 'https://javascript.pages.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();

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

    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var postData = function (formData, onSuccess, onError) {
    var POST_URL = 'https://javascript.pages.academy/kekstagram';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.open('POST', POST_URL);
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.send(formData);
  };
  window.data = {
    getData: getData,
    postData: postData
  };
})();
