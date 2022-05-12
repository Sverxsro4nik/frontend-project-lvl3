import onChange from 'on-change';
import renderModal from './render/renderModal.js';
import postsRender from './render/postsRender.js';
import feedsRender from './render/feedsRender.js';
import renderFeedback from './render/renderFeedback.js';

const view = (state, elements, text) => onChange(state, (path, current) => {
  const {
    pageHeader, pageDescription, rssInput, rssExample, addButton, form,
    feedsHeader, postsHeader, viewButton, readButton, modalClose, feedback, modal,
    postsContainer, feedsContainer,
  } = elements;
  if (path === 'lng') {
    text.changeLanguage(current).then((t) => {
      pageHeader.textContent = t('h1');
      pageDescription.textContent = t('content');
      rssInput.setAttribute('placeholder', t('placeholder'));
      rssExample.textContent = t('example');
      addButton.textContent = t('addButton');
      feedsHeader.textContent = t('feeds');
      postsHeader.textContent = t('posts');
      viewButton.textContent = t('view');
      readButton.textContent = t('modalRead');
      modalClose.textContent = t('modalClose');
    });
  }

  if (path === 'urlValidation') {
    if (current === 'invalid') {
      renderFeedback(feedback, 'text-danger', 'text-success', text.t('invalid'));
    }
    if (current === 'present') {
      renderFeedback(feedback, 'text-danger', 'text-success', text.t('duplication'));
    }
  }

  if (path === 'parsingError') {
    if (!current && state.downloadStatus === 'success') {
      renderFeedback(feedback, 'text-success', 'text-danger', text.t('valid'));
      feedsRender(feedsContainer, state);
      postsRender(postsContainer, state);
      form.reset();
      rssInput.focus();
    } else {
      renderFeedback(feedback, 'text-danger', 'text-success', text.t('parsingError'));
    }
  }

  if (path === 'downloadStatus') {
    switch (current) {
      case 'in-process':
        rssExample.textContent = text.t('');
        rssInput.setAttribute('readonly', true);
        addButton.setAttribute('disabled', true);
        break;
      case 'start':
        rssInput.removeAttribute('readonly');
        addButton.removeAttribute('disabled');
        break;
      case 'success':
        rssInput.removeAttribute('readonly');
        addButton.removeAttribute('disabled');
        break;
      case 'failed':
        rssInput.removeAttribute('readonly');
        addButton.removeAttribute('disabled');
        renderFeedback(feedback, 'text-danger', 'text-success', text.t('networkError'));
        break;
      default:
        throw new Error(`Unknow status ${current}`);
    }
  }

  if (path === 'modalShow') {
    if (current === 'show') {
      renderModal(modal, state.postForModal);
    }
  }

  if (path === 'loadingData') {
    postsRender(postsContainer, state);
  }
});

export default view;
