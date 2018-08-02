const blogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "testuser",
      name: "Test User"
    }
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "testuser",
      name: "Test User"
    }
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

let token = null;

const setToken = newToken => {
  token = newToken;
};

export default { getAll, setToken, blogs };
