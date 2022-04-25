export default () => {
  const form = document.createElement('form');
  const inputField = document.createElement('input');
  inputField.classList.add('form-input', 'w-100');
  inputField.setAttribute('placeholder', 'ссылка RSS');
  inputField.setAttribute('name', 'url');
  inputField.setAttribute('autocomplete', 'off');
  const button = document.createElement('button');
  button.textContent = 'Добавить';
  button.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5');
  form.append(inputField);
  form.append(button);
  return form;
};
