import createForm from './createForm.js';

export default () => {
  document.body.classList.add('d-flex', 'flex-column', 'min-vh-100');

  const mainElement = document.createElement('main');
  mainElement.classList.add('flex-grow-1');
  document.body.append(mainElement);

  const sectionElement = document.createElement('section');
  sectionElement.classList.add('container-fluid', 'bg-dark', 'p-5');
  mainElement.append(sectionElement);

  const createRowContainer = document.createElement('div');
  createRowContainer.classList.add('row');
  sectionElement.append(createRowContainer);
  const elementsContainer = document.createElement('div');
  createRowContainer.append(elementsContainer);

  elementsContainer.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
  const firstHeader = document.createElement('h1');
  firstHeader.classList.add('display-3', 'mb-0');
  firstHeader.textContent = 'RSS агрегатор';
  elementsContainer.append(firstHeader);

  const textByHeader = document.createElement('p');
  textByHeader.classList.add('lead');
  textByHeader.textContent = 'Начните читать RSS сегодня! Это легко, это красиво.';
  elementsContainer.append(textByHeader);

  const rssForm = createForm();
  elementsContainer.append(rssForm);

  const exampleParagraph = document.createElement('p');
  exampleParagraph.classList.add('mt-2', 'mb-0', 'text-muted');
  exampleParagraph.textContent = 'Пример: https://ru.hexlet.io/lessons.rss';
  elementsContainer.append(exampleParagraph);

  const feedParagraph = document.createElement('p');
  feedParagraph.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
  elementsContainer.append(feedParagraph);
};
