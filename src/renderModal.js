const renderModal = (modal, actualPost) => {
  console.log(actualPost);
  const { postTitle, postDescription, postLink } = actualPost;
  const title = modal.querySelector('.modal-title');
  const description = modal.querySelector('.modal-body');
  const link = modal.querySelector('.full-article');

  title.textContent = postTitle;
  description.textContent = postDescription;
  link.setAttribute('href', postLink);
};

export default renderModal;
