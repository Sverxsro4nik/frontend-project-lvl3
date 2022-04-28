import view from './view.js';
import validate from './validate.js';

const app = () => {
  const state = {
    rssForm: {
      urls: [],
    },
    status: {
      validation: 'invalid',
    },
  };
  const rssForm = document.querySelector('.rss-form');
  const watcher = view(state);
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

export default app;
