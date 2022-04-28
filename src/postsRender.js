const createFeedsField = (feeds) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h2');
  cardTitle.textContent = 'Фиды';
  cardTitle.classList.add('card-title', 'h4');
  cardBody.append(cardTitle);
  card.append(cardBody);

  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'border-0', 'rounded-0');
  feeds.forEach((feed) => {
    const { feedTitle, feedDescription } = feed;
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'border-0', 'border-end-0');
    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    title.textContent = feedTitle;
    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feedDescription;
    item.append(title);
    item.append(description);
    feedsList.append(item);
  });
  card.append(feedsList);
  return card;
};

const createPostsField = (posts) => {

};

const postsRender = (feeds, posts) => {
  const feedsDiv = document.querySelector('.feeds');
  const postsDiv = document.querySelector('.posts');
  console.log(feeds);
  const allFeeds = createFeedsField(feeds);
  const allPosts = createPostsField(posts);
  feedsDiv.append(allFeeds);
  postsDiv.append(allPosts);
};

export default postsRender;
