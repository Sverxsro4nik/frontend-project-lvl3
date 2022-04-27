import state from './state.js';
import validate from './validate.js';
import { watcherInput } from './view.js';

export default () => {
  const sendButton = document.querySelector('[aria-label="add"]');
  const rssInput = document.getElementById('url-input');

  sendButton.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  rssInput.addEventListener('input', async (e) => {
    watcherInput.rssForm.urlPath = e.target.value;
    watcherInput.errors = validate(state.rssForm);
  });
};
