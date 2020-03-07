import debounce from 'lodash.debounce';
import imgService from './fetch-images';
import imageListItemsTemplate from '../templates/image-template.hbs';

const refs = {
  input: document.querySelector('.search-form'),
  galery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.input.addEventListener('input', debounce(search, 1000));
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function search(e) {
  e.preventDefault();

  const inputValue = e.target.value;
  clearList();
  imgService.resetPage();
  imgService.searchQuery = inputValue;

  imgService.fetchImages().then(insertListItems);
}

function insertListItems(items) {
  const murkup = imageListItemsTemplate(items);
  refs.galery.insertAdjacentHTML('beforeend', murkup);
}

function loadMoreBtnHandler() {
  imgService
    .fetchImages()
    .then(insertListItems)
    .finally(smoothScroll);
  // smoothScroll();
}

function clearList() {
  refs.galery.innerHTML = '';
}

function smoothScroll() {
  const windowHeight = window.outerHeight;
  let pageNumber = imgService.page;
  let scrollHeight = windowHeight * pageNumber;

  window.scrollTo({
    top: scrollHeight,
    behavior: 'smooth',
  });
}
