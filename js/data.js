'use strict';
// data.js модуль данных
(function () {
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;
  var Url = {
    GET_URL: 'https://javascript.pages.academy/kekstagram/data',
    POST_URL: 'https://javascript.pages.academy/kekstagram'
  };

  var createXhr = function (method, methodUrl, formData, onSuccess, onError) {
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

    xhr.open(method, methodUrl);
    if (method === 'GET') {
      xhr.send();
    } else if (method === 'POST') {
      xhr.send(formData);
    }
  };

  var getData = function (onSuccess, onError) {
    createXhr('GET', Url.GET_URL, null, onSuccess, onError);
  };

  var saveData = function (formData, onSuccess, onError) {
    createXhr('POST', Url.POST_URL, formData, onSuccess, onError);
  };
  window.data = {
    getData: getData,
    saveData: saveData
  };
})();
