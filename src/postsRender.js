// import _ from 'lodash';

const createPostsField = (state) => {
  const { posts, readedPosts } = state;
  const postsDiv = document.querySelector('.posts');
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h2');
  cardTitle.textContent = 'Посты';
  cardTitle.classList.add('card-title', 'h4');
  cardBody.append(cardTitle);
  card.append(cardBody);
  const postsList = document.createElement('ul');
  postsList.classList.add('list-group', 'border-0', 'rounded-0');
  posts.forEach((post) => {
    const { postTitle, postLink, postId } = post;
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const link = document.createElement('a');
    const actualClass = readedPosts.includes(postId) ? 'fw-normal link-secondary' : 'fw-bold';
    link.setAttribute('class', actualClass);
    link.setAttribute('data-post-id', postId);
    link.setAttribute('href', postLink);
    link.target = '_blank';
    link.setAttribute('rel', 'noopener noreferrer');
    link.textContent = postTitle;
    const postButton = document.createElement('button');
    postButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    postButton.setAttribute('type', 'button');
    postButton.setAttribute('data-post-id', postId);
    postButton.setAttribute('data-bs-toggle', 'modal');
    postButton.setAttribute('data-bs-target', '#modal');
    postButton.textContent = 'Просмотр';
    item.append(link);
    item.append(postButton);
    postsList.append(item);
  });
  card.append(postsList);
  postsDiv.replaceChildren(card);
};

export default createPostsField;
