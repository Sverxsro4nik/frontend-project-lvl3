import onChange from 'on-change';
import state from './state.js';

const watcherInput = onChange(state, (path, current, prepend) => {
  console.log(path);
  console.log(prepend);
  console.log(current);
});

// eslint-disable-next-line import/prefer-default-export
export { watcherInput };
