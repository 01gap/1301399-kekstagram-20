'use strict';
(function () {
  var allPics;
  var filters = document.querySelector('.img-filters');
  var filterForm = filters.querySelector('.img-filters__form');

  var getRandomPics = function () {
    var randomPics = window.filters.chooseRandomPics(allPics);
    window.picture.renderAllImages(randomPics);
  };

  var getDiscussedPics = function () {
    var sortedPics = window.filters.getMostCommentedFirst(allPics);
    window.picture.renderAllImages(sortedPics);
  };

  var getDefaultPics = function () {
    window.picture.renderAllImages(allPics);
  };

  var filterFunctions = {
    'filter-default': getDefaultPics,
    'filter-random': getRandomPics,
    'filter-discussed': getDiscussedPics
  };

  filterForm.addEventListener('click', function (evt) {
    var id = evt.target.getAttribute('id');
    var func = filterFunctions[id];
    func();
    filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  });

  var onGetDataSuccess = function (data) {
    allPics = data;
    filters.classList.remove('img-filters--inactive');
    window.picture.renderAllImages(data);
  };

  window.addEventListener('load', function () {
    window.backend.getData(onGetDataSuccess, function () {});
  });
})();
