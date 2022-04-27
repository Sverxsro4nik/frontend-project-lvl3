import onChange from 'on-change';

const watcher = (state) => onChange(state, (path, value) => {
  console.log(path);
  console.log(state);
  console.log(value);
});

export default watcher;
