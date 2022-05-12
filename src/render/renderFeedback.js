export default (element, actualClass, removeClass, text) => {
  element.classList.remove(removeClass);
  element.classList.add(actualClass);
  // eslint-disable-next-line no-param-reassign
  element.textContent = text;
};
