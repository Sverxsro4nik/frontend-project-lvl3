import i18next from 'i18next';
import axios from 'axios';
import view from './view.js';
import validate from './validate.js';
import resources from './locales/locales.js';
import parser from './parser.js';
import postsRender from './postsRender.js';

const routes = {
  getPathRss: (path) => `https://allorigins.hexlet.app/get?url=${encodeURIComponent(path)}`,
};

const app = () => {
  const defaultLanguage = 'ru';
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  }).then(() => {
    const state = {
      rssForm: {
        urls: [],
      },
      feeds: [],
      posts: [],
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
          const { feed, posts } = data;
          watcher.feeds = [feed, ...state.feeds];
          watcher.posts = [feed, ...state.posts];
          postsRender(state.feeds, state.posts);
        });
      });
    });
  });
};

export default app;
