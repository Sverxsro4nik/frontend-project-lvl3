export default () => {
  const rssForm = document.createElement('form');
  rssForm.classList.add('rss-form', 'text-body');
  rssForm.setAttribute('action', '');

  const formRow = document.createElement('div');
  formRow.classList.add('row');
  rssForm.append(formRow);

  const formColumn = document.createElement('div');
  formColumn.classList.add('col');
  formRow.append(formColumn);

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('form-floating');
  formColumn.append(inputContainer);

  const textInput = document.createElement('input');
  textInput.setAttribute('id', 'url-input');
  textInput.setAttribute('autofocus', '');
  textInput.setAttribute('name', 'url');
  textInput.setAttribute('required', '');
  textInput.setAttribute('aria-label', 'url');
  textInput.setAttribute('placeholder', 'ссылка RSS');
  textInput.setAttribute('autocomplete', 'off');
  textInput.classList.add('form-control', 'w-100');
  inputContainer.append(textInput);

  const textLabel = document.createElement('label');
  textLabel.textContent = 'Ссылка RSS';
  textLabel.setAttribute('for', 'url-input');
  inputContainer.append(textLabel);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('col-auto');
  formRow.append(buttonContainer);

  const addButton = document.createElement('button');
  addButton.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5');
  addButton.setAttribute('type', 'submit');
  addButton.setAttribute('aria-label', 'add');
  addButton.textContent = 'Добавить';
  buttonContainer.append(addButton);
  return rssForm;
};
