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
    const postId = post.querySelector('link').textContent.trim();
    const postsTitle = post.querySelector('title').textContent.trim();
    const postDescription = post.querySelector('description').textContent.trim();
    posts.push({ postId, postsTitle, postDescription });
  });
  return { feed, posts };
};

export default parser;
