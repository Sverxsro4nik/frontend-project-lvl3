import i18next from 'i18next';
import view from './view.js';
import validate from './validate.js';
import resources from './locales/locales.js';

const app = () => {
  const defaultLanguage = 'ru';
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: defaultLanguage,
    debug: true,
    resources,
  }).then(() => {
    const state = {
      rssForm: {
        urls: [],
      },
      status: {
        validation: 'invalid',
      },
    };
    const rssForm = document.querySelector('.rss-form');
    const watcher = view(state, i18nextInstance);
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
  });
};

export default app;
