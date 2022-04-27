import watcher from './view.js';
import validate from './validate.js';

const controller = (state) => {
  const rssForm = document.querySelector('.rss-form');
  const rssInput = document.getElementById('url-input');

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  rssInput.addEventListener('input', (e) => {
    watcher.rssForm.urlPath = e.target.value;
    watcher.errors = validate(state.rssForm.urlPath);
    console.log('state', state);
  });
};

export default controller;
