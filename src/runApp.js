import onChange from 'on-change';
import validate from './validate.js';

const view = (state) => onChange(state, (path, current, prepend) => {
  const feedback = document.querySelector('.feedback');
  console.log('path', path);
  console.log('current', current);
  console.log('prepend', prepend);
  console.log('state', state);
  if (state.status.validation === 'valid') {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS успешно загружен';
  } else {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    const textInFeed = current === 'invalid' ? 'Ссылка должна быть валидным URL' : 'RSS уже существует';
    feedback.textContent = textInFeed;
  }
});

const app = () => {
  const state = {
    rssForm: {
      urls: [],
    },
    status: {
      validation: 'invalid',
    },
  };
  const watcher = view(state);
  const controller = () => {
    const rssForm = document.querySelector('.rss-form');
    rssForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formValue = new FormData(e.target);
      const value = formValue.get('url');
      validate(value).then(() => {
        if (watcher.rssForm.urls.includes(value)) {
          watcher.status.validation = 'present';
        } else {
          watcher.status.validation = 'valid';
          watcher.rssForm.urls = [value, ...watcher.rssForm.urls];
        }
        console.log(state.rssForm.urls);
      }).catch(() => {
        watcher.status.validation = 'invalid';
      });
    });
  };
  controller(state);
};

export default app;
