const parser = (data) => {
  const parserData = new DOMParser();
  const format = 'application/xml';
  const parcingData = parserData.parseFromString(data, format);
  const parseError = parcingData.querySelector('parsererror');

  if (parseError) {
    return null;
  }

  const feedId = parcingData.querySelector('link').textContent.trim();
  const feedTitle = parcingData.querySelector('title').textContent.trim();
  const feedDescription = parcingData.querySelector('description').textContent.trim();

  const feed = {
    feedId, feedTitle, feedDescription,
  };

  const feedPosts = Array.from(parcingData.querySelectorAll('item'));
  const posts = [];

  feedPosts.forEach((post) => {
    const postFeedId = feedId;
    const postTitle = post.querySelector('title').textContent.trim();
    const postId = post.querySelector('guid').textContent.trim();
    const postLink = post.querySelector('link').textContent.trim();
    const postDescription = post.querySelector('description').textContent.trim();
    posts.push({
      postFeedId, postId, postTitle, postLink, postDescription,
    });
  });
  return { feed, posts };
};

export default parser;
