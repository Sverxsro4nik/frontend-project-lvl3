import onChange from 'on-change';
import renderModal from './renderModal.js';

const view = (state, text) => onChange(state, (path, current) => {
  const feedback = document.querySelector('.feedback');
  const modal = document.getElementById('modal');
  console.log('path', path);
  // console.log('current', current);
  // console.log('prepend', prepend);
  // console.log('state', state);
  // console.log(text);
  if (state.status.validation === 'valid') {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS успешно загружен';
  } else {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    const textInFeed = current === 'invalid' ? 'Ссылка должна быть валидным URL' : 'RSS уже существует';
    feedback.textContent = textInFeed;
  }

  if (path === 'modalShow') {
    if (current === 'show') {
      renderModal(modal, state.postForModal);
    }
  }
});

export default view;
