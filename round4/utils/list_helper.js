const dummy = () => {
  // ...
  return 1;
};

const totalLikes = blogs =>
  blogs.length ? blogs.reduce((acc, curr) => acc + curr.likes, 0) : 0;

const favoriteBlog = blogs => {
  const mostLikes = blogs.reduce(
    (acc, curr) => (!acc ? curr : curr.likes > acc.likes ? curr : acc),
    null
  );

  return mostLikes
    ? {
        title: mostLikes.title,
        author: mostLikes.author,
        likes: mostLikes.likes
      }
    : null;
};

const mostBlogs = blogs => {
  const blogMap = new Map();
  blogs.forEach(item => {
    const curr = blogMap.get(item.author) || 0;
    blogMap.set(item.author, curr + 1);
  });
  const topAuthor = Array.from(blogMap).reduce(
    (acc, curr) => (!acc ? curr : curr[1] > acc[1] ? curr : acc),
    null
  );
  return topAuthor ? { author: topAuthor[0], blogs: topAuthor[1] } : null;
};

const mostLikes = blogs => {
  const blogMap = new Map();
  blogs.forEach(item => {
    const curr = blogMap.get(item.author) || 0;
    blogMap.set(item.author, curr + item.likes);
  });
  const topAuthor = Array.from(blogMap).reduce(
    (acc, curr) => (!acc ? curr : curr[1] > acc[1] ? curr : acc),
    null
  );
  return topAuthor ? { author: topAuthor[0], likes: topAuthor[1] } : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
