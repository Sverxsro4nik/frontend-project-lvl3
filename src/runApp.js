import i18next from 'i18next';
import _ from 'lodash';
import axios from 'axios';
import view from './view.js';
import validate from './validate.js';
import resources from './locales/locales.js';
import parser from './parser.js';

const routes = {
  getPathRss: (path) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(path)}`,
};

// http://lorem-rss.herokuapp.com/feed

const app = () => {
  const defaultLanguage = 'ru';
  const i18nextInstance = i18next.createInstance();

  i18nextInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  }).then(() => {
    const initialState = {
      rssForm: {
        urls: [],
      },
      feeds: [],
      posts: [],
      readedPosts: [],
      postForModal: {},
      status: {
        loadProcess: 'start',
        validation: 'invalid',
        loadData: 'loading',
      },
      modalShow: 'hidden',
    };

    const rssForm = document.querySelector('.rss-form');
    const postsContainer = document.querySelector('.posts');
    const watcher = view(initialState, i18nextInstance);

    const updatePosts = () => {
      watcher.status.loadData = 'loading';
      setTimeout(() => {
        const urlLinks = watcher.rssForm.urls;
        Promise.all(urlLinks.map((link) => axios.get(routes.getPathRss(link))
          .then((response) => parser(response.data.contents))
          .then(({ posts }) => posts))).then((data) => {
          const postDiff = _.differenceWith(data.flat(), watcher.posts, _.isEqual);
          watcher.posts.unshift(...postDiff);
          watcher.status.loadData = 'upload';
          updatePosts();
        }).catch((err) => {
          console.log(err);
          updatePosts();
        });
      }, 5000);
    };

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
          watcher.status.loadProcess = 'in-process';
          watcher.status.loadData = 'loading';
          axios.get(routes.getPathRss(value)).then((response) => {
            const data = parser(response.data.contents);
            const { feed, posts } = data;
            watcher.feeds = [feed, ...watcher.feeds];
            watcher.posts = posts.concat(watcher.posts);
            watcher.status.loadData = 'success';
            rssForm.reset();
            if (watcher.status.loadData === 'loading') {
              updatePosts();
            }
          }).catch((error) => {
            const { message } = error;
            if (message === 'Network Error') {
              watcher.status.loadProcess = 'failed';
            }
          }).then(() => {
            watcher.status.loadData = 'start';
            watcher.status.validation = 'valid';
          });
        }
      });
    });

    postsContainer.addEventListener('click', (e) => {
      const elem = e.target;
      const id = elem.dataset.postId;
      if (id && !watcher.readedPosts.includes(id)) {
        watcher.readedPosts.push(id);
      }
      const [actualPost] = watcher.posts.filter((post) => post.postId === id);
      watcher.postForModal = actualPost;
      watcher.modalShow = 'show';
      watcher.modalShow = 'hidden';
    });
  });
};

export default app;
