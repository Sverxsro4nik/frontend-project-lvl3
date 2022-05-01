import onChange from 'on-change';

const view = (state, text) => onChange(state, (path, current) => {
  const feedback = document.querySelector('.feedback');
  // const addButton = document.querySelector('[aria-label=add]');
  // console.log('path', path);
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
});

export default view;
