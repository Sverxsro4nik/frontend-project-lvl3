import onChange from 'on-change';
import renderModal from './renderModal.js';
import createPostsField from './postsRender.js';
import createFeedsField from './feedsRender.js';

const view = (state, elements, text) => onChange(state, (path, current) => {
  const {
    pageHeader, pageDescription, rssInput, rssExample, addButton, rssForm,
    feedsHeader, postsHeader, viewButton, readButton, modalClose, feedback, modal,
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

  if (state.status.validation === 'valid') {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = text.t('valid');
    createFeedsField(state.feeds);
    createPostsField(state);
    rssForm.reset();
    rssInput.focus();
  } else {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    const textInFeed = current === 'invalid' ? text.t('invalid') : text.t('duplication');
    feedback.textContent = textInFeed;
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
    createPostsField(state);
  }
});

export default view;
