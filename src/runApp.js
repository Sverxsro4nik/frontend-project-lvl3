import i18next from 'i18next';
import axios from 'axios';
import view from './view.js';
import validate from './validate.js';
import resources from './locales/locales.js';
import parser from './parser.js';

const routes = {
  getPathRss: (path) => `https://allorigins.hexlet.app/get?url=${encodeURIComponent(path)}`,
};

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
      }).catch(() => {
        watcher.status.validation = 'invalid';
      }).then(() => {
        axios.get(routes.getPathRss(value)).then((response) => {
          const data = parser(response.data.contents);
          console.log(data);
        });
      });
    });
  });
};

export default app;
