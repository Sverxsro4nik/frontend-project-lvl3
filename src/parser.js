const parser = (data) => {
  const parserData = new DOMParser();
  const format = 'application/xml';
  const parcingData = parserData.parseFromString(data, format);
  const feedId = parcingData.querySelector('link').textContent.trim();
  const feedTitle = parcingData.querySelector('title').textContent.trim();
  const feedDescription = parcingData.querySelector('description').textContent.trim();
  const feed = {
    feedId, feedTitle, feedDescription,
  };
  const feedPosts = Array.from(parcingData.querySelectorAll('item'));
  const posts = [];
  feedPosts.forEach((post) => {
    const postTitle = post.querySelector('title').textContent.trim();
    const postLink = post.querySelector('link').textContent.trim();
    const postDescription = post.querySelector('description').textContent.trim();
    posts.push({
      postTitle, postLink, postDescription,
    });
  });
  return { feed, posts };
};

export default parser;
