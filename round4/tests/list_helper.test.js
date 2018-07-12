const listHelper = require("../utils/list_helper");
const { listWithOneBlog, initialBlogs } = require("./test_helper");

test("dummy is called", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("totalLikes()", () => {
  test("outputs the correct total count of likes for a single of blog", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0].likes);
  });

  test("outputs zero for an empty array of blogs", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("outputs the correct total count of likes for an array of blogs", () => {
    const result = listHelper.totalLikes(initialBlogs);
    expect(result).toBe(36);
  });
});

describe("favoriteBlog()", () => {
  test("returns the data for the blog with the most likes", () => {
    const result = listHelper.favoriteBlog(initialBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  });
  test("returns the data for the only blog in an array", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5
    });
  });
  test("returns null for an empty array of blogs", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  });
});

describe("mostBlogs()", () => {
  test("return the author of the one having the most blogs", () => {
    const result = listHelper.mostBlogs(initialBlogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
  test("return the author of the one having the only blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
  });
  test("return null for an empty array of blogs", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual(null);
  });
});

describe("mostLikes()", () => {
  test("return the author of the one having the most likes", () => {
    const result = listHelper.mostLikes(initialBlogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
  test("return the author of the one having the only blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 5 });
  });
  test("return null for an empty array of blogs", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual(null);
  });
});
