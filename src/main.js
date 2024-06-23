import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { imgTemplate } from './js/render-function';
import { getPhoto } from './js/pixabay-api';
const loader = document.querySelector('.loader');

loader.style.display = 'none';

const refreshPage = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  widthRatio: 1,
  height: '500px',
});

const formEl = document.querySelector('.form-search');
const imagesUl = document.querySelector('.gallery');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  loader.style.display = 'block';
  const value = formEl.elements.request.value.trim();
  if (!value) {
    iziToast.show({
      message: 'Please,  enter a picture',
      messageColor: 'white',
      backgroundColor: 'red',
      progressBarColor: 'white',
    });
  } else {
    getPhoto(value)
      .then(data => {
        loader.style.display = 'none';
        if (!data.hits.length) {
          iziToast.show({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            messageColor: 'white',
            backgroundColor: 'red',
            progressBarColor: 'white',
          });
        }
        const markup = imgTemplate(data);
        imagesUl.innerHTML = markup;

        refreshPage.refresh();
      })

      .catch(err => {
        console.log(err);
      });
  }

  formEl.elements.request.value = '';
});
