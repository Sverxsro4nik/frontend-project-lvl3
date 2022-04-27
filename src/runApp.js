// import watcher from './view.js';
// import controller from './controller.js';

import onChange from 'on-change';
import _ from 'lodash';
import validate from './validate.js';

const view = (state) => onChange(state, (path, current, prepend) => {
  const feedback = document.querySelector('.feedback');
  console.log('path', path);
  console.log('current', current);
  console.log('prepend', prepend);
  console.log('state', state);
  if (path === 'rssForm.urlPath' && _.isEmpty(state.errors)) {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS успешно загружен';
  } else {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = 'Ссылка должна быть валидным URL';
  }
});

const app = () => {
  const state = {
    rssForm: {
      urlPath: '',
    },
    errors: {},
  };
  const watcher = view(state);
  const controller = () => {
    const rssForm = document.querySelector('.rss-form');
    const urlInput = document.getElementById('url-input');
    rssForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('work');
      watcher.rssForm.urlPath = urlInput.value;
      watcher.errors = validate(urlInput.value);
      console.log(state);
    });
  };
  controller(state);
};

export default app;
