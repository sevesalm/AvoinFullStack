const blogs = [
  {
    author: 'Michael Chan',
    id: '5a422a851b54a676234d17f7',
    likes: 7,
    title: 'React patterns',
    url: 'https://reactpatterns.com/',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      name: 'Test User',
      username: 'testuser'
    }
  },
  {
    author: 'Edsger W. Dijkstra',
    id: '5a422aa71b54a676234d17f8',
    likes: 5,
    title: 'Go To Statement Considered Harmful',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      name: 'Test User',
      username: 'testuser'
    }
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, blogs };
