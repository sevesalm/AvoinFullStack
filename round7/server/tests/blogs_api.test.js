const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const {
  initialBlogs,
  getAllBlogs,
  initialUsers,
  getAllUsers
} = require('./test_helper');

describe('/api', () => {
  let rootTokenInfo = null;

  beforeAll(async () => {
    const loginData = {
      username: 'root',
      password: 'password'
    };

    const result = await api.post('/api/login').send(loginData);
    rootTokenInfo = result.body;
  });

  afterAll(() => {
    server.close();
  });

  describe('/api/blogs', () => {
    beforeAll(() => {
      console.log = jest.fn();
    });

    beforeEach(async () => {
      await Blog.remove();
      const blogObjects = initialBlogs.map(item => new Blog(item));
      await Promise.all(blogObjects.map(item => item.save()));

      await User.remove();
      const userObjects = initialUsers.map(item => new User(item));
      await Promise.all(userObjects.map(item => item.save()));
    });

    test('a valid new blog is added', async () => {
      const blogs = await getAllBlogs();

      const newBlog = {
        author: 'Tester',
        title: 'Test title',
        url: 'http://test.com',
        likes: 5
      };

      const postRes = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${rootTokenInfo.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(postRes.body).toMatchObject({ ...newBlog, comments: [] });

      const getRes = await api.get('/api/blogs');
      expect(getRes.body).toContainEqual({
        ...newBlog,
        comments: [],
        id: expect.anything(),
        user: expect.objectContaining({
          username: rootTokenInfo.username,
          name: rootTokenInfo.name
        })
      });
      expect(getRes.body.length).toBe(blogs.length + 1);
    });

    test("a blog can't be added without the authorization token", async () => {
      const newBlog = {
        author: 'Tester',
        title: 'Test title',
        url: 'http://test.com',
        likes: 5
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401);
    });

    test("a blog can't be added with an incorrect authorization token", async () => {
      const newBlog = {
        author: 'Tester',
        title: 'Test title',
        url: 'http://test.com',
        likes: 5
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', 'bearer 1234567890')
        .expect(401);
    });

    test('like count is initialized if not given', async () => {
      const newBlog = {
        author: 'Tester',
        title: 'Test title',
        url: 'http://test.com'
      };
      const postRes = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${rootTokenInfo.token}`)

        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(postRes.body).toMatchObject({ ...newBlog, likes: 0 });
    });

    test('missing title results in an error', async () => {
      const newBlog = {
        author: 'Tester',
        url: 'http://test.com'
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${rootTokenInfo.token}`)
        .expect(400);
    });

    test('missing url results in an error', async () => {
      const newBlog = {
        author: 'Tester',
        title: 'Test title'
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${rootTokenInfo.token}`)
        .expect(400);
    });

    test('missing author is allowed', async () => {
      const newBlog = {
        title: 'Test title',
        url: 'http://test.com'
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${rootTokenInfo.token}`)
        .expect(201);
    });

    test('initial blogs are returned as json', async () => {
      const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(res.body.length).toBe(initialBlogs.length);

      initialBlogs.forEach(item =>
        expect(res.body).toContainEqual({
          ...Blog.format({ ...item, comments: [] }),
          user: expect.anything()
        })
      );
    });

    test('existing blog is deleted', async () => {
      await api
        .delete(`/api/blogs/${initialBlogs[0]._id}`)
        .set('Authorization', `bearer ${rootTokenInfo.token}`)
        .expect(204);
      const result = await getAllBlogs();
      expect(result.length).toBe(initialBlogs.length - 1);
    });

    test('invalid id results an error when deleting', async () => {
      await api
        .delete('/api/blogs/invalid-id')
        .set('Authorization', `bearer ${rootTokenInfo.token}`)
        .expect(400, { error: 'Invalid id' });
    });

    test("user can't delete a blog of another user", async () => {
      const loginData = {
        username: 'user',
        password: 'password'
      };

      const result = await api.post('/api/login').send(loginData);
      const tokenInfo = result.body;
      await api
        .delete(`/api/blogs/${initialBlogs[0]._id}`)
        .set('Authorization', `bearer ${tokenInfo.token}`)
        .expect(403, { error: 'Not authorized' });
    });

    test('updating likes on an existing blog', async () => {
      const updatedBlog = {
        likes: 100
      };
      const result = await api
        .put(`/api/blogs/${initialBlogs[0]._id}`)
        .send(updatedBlog)
        .expect(200);
      expect(result.body).toMatchObject({ likes: 100 });
    });

    test('comment can be added', async () => {
      const comment = 'This is a comment';

      const result = await api
        .post(`/api/blogs/${initialBlogs[0]._id}/comments`)
        .send({ comment })
        .expect(200);

      expect(result.body.comments.length).toEqual(1);
      expect(result.body.comments[0]).toEqual(comment);
    });
  });

  describe('/api/users', () => {
    beforeAll(() => {
      console.log = jest.fn();
    });

    beforeEach(async () => {
      await User.remove();

      const userObjects = initialUsers.map(item => new User(item));
      await Promise.all(userObjects.map(item => item.save()));
    });

    test('returs the list of all users', async () => {
      const result = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(result.body.length).toEqual(2);
    });

    test("an existing username can't be added", async () => {
      const newUser = {
        username: 'root',
        password: 'password',
        name: 'Test User',
        isAdult: true
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400, { error: 'Username already exists' })
        .expect('Content-Type', /application\/json/);
    });

    test('a password too short is not accepted', async () => {
      const newUser = {
        username: 'super-user',
        password: 'ss',
        name: 'Test User',
        isAdult: true
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400, { error: 'Invalid or missing password' })
        .expect('Content-Type', /application\/json/);
    });

    test('a valid new user is added', async () => {
      const users = await getAllUsers();

      const newUser = {
        username: 'test-user',
        password: 'password',
        name: 'Test User',
        isAdult: true
      };

      const postRes = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(postRes.body).toMatchObject({
        username: newUser.username,
        name: newUser.name,
        isAdult: newUser.isAdult
      });

      const finalUsers = await getAllUsers();
      expect(finalUsers.length).toBe(users.length + 1);
    });
  });
});
