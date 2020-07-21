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
  window.data = {
    getData: getData,
    saveData: saveData
  };
})();
