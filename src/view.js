import onChange from 'on-change';
import renderModal from './renderModal.js';
import createPostsField from './postsRender.js';
import createFeedsField from './feedsRender.js';

const view = (state, elements, text) => onChange(state, (path, current) => {
  const {
    pageHeader, pageDescription, rssInput, rssExample, addButton, form,
    feedsHeader, postsHeader, viewButton, readButton, modalClose, feedback, modal,
    postsContainer, feedsContainer,
  } = elements;
  console.log('path', path);
  console.log('state', state);
  // console.log('current', current);
  // console.log('elements', elements);
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

  if (path === 'status.validation') {
    if (current === 'invalid') {
      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      feedback.textContent = text.t('invalid');
    }
    if (current === 'present') {
      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      feedback.textContent = text.t('duplication');
    }
  }

  if (path === 'status.parseError') {
    console.log('current in parseError', current);
    if (!current && state.status.loadProcess === 'success') {
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      feedback.textContent = text.t('valid');
      createFeedsField(feedsContainer, state);
      createPostsField(postsContainer, state);
      form.reset();
      rssInput.focus();
    } else {
      feedback.textContent = text.t('parsingError');
    }
  }

  if (path === 'status.loadProcess') {
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
        break;
      default:
        throw new Error(`Unknow status ${current}`);
    }
  }

  if (path === 'modalShow') {
    if (current === 'show') {
      console.log('work');
      renderModal(modal, state.postForModal);
    }
  }

  if (path === 'status.loadData') {
    createPostsField(postsContainer, state);
  }
});

export default view;
