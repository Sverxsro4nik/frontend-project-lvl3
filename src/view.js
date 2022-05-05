import onChange from 'on-change';
import renderModal from './renderModal.js';
import createPostsField from './postsRender.js';
import createFeedsField from './feedsRender.js';

const view = (state) => onChange(state, (path, current) => {
  const feedback = document.querySelector('.feedback');
  const modal = document.getElementById('modal');
  console.log('path', path);
  if (state.status.validation === 'valid') {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS успешно загружен';
    createFeedsField(state.feeds);
    createPostsField(state);
  } else {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    const textInFeed = current === 'invalid' ? 'Ссылка должна быть валидным URL' : 'RSS уже существует';
    feedback.textContent = textInFeed;
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
