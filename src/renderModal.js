const renderModal = (modal, actualPost) => {
  const { postTitle, postDescription, postLink } = actualPost;
  const title = document.querySelector('.modal-title');
  const description = document.querySelector('.modal-body');
  const link = document.querySelector('.full-article');

  title.textContent = postTitle;
  description.textContent = postDescription;
  link.href = postLink;
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', true);
  modal.classList.add('show');
  console.log(modal);
};

export default renderModal;
