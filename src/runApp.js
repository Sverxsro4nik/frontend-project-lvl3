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
      urls: [],
    },
    errors: {},
  };
  const watcher = view(state);
  const controller = () => {
    const rssForm = document.querySelector('.rss-form');
    rssForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formValue = new FormData(e.target);
      const value = formValue.get('url');
      watcher.rssForm.urls = validate(value);
    });
  };
  controller(state);
};

export default app;
