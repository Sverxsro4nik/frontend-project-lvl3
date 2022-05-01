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
        loadData: 'loading',
      },
    };
    const rssForm = document.querySelector('.rss-form');
    const watcher = view(state, i18nextInstance);
    rssForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formValue = new FormData(e.target);
      const value = formValue.get('url');
      validate(value, i18nextInstance).then(() => {
        if (!watcher.rssForm.urls.includes(value)) {
          watcher.rssForm.urls.unshift(value);
          watcher.status.validation = 'valid';
        } else {
          watcher.status.validation = 'present';
        }
      }).catch(() => {
        watcher.status.validation = 'invalid';
      }).then(() => {
        if (watcher.status.validation === 'valid') {
          axios.get(routes.getPathRss(value)).then((response) => {
            const data = parser(response.data.contents);
            const { feed, posts } = data;
            watcher.feeds = [feed, ...state.feeds];
            watcher.posts = posts.concat(state.posts);
            postsRender(state.feeds, state.posts);
            rssForm.reset();
          }).catch((error) => {
            console.log(error);
          });
        }
      });
    });
  });
};

export default app;
