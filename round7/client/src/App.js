import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { notificationActions } from './reducers/notificationReducer';
import NavBar from './components/NavBar';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import SubmitBlogForm from './components/SubmitBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { userActions } from './reducers/userReducer';
import { blogActions } from './reducers/blogReducer';

export const LOCAL_STORAGE_USER_KEY = 'loggedInBlogsUser';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user: null,
      blogs: []
    };
  }

  async componentDidMount() {
    const blogs = await blogService.getAll();
    this.setState({ blogs });

    this.props.initUsers();
    this.props.initBlogs();

    const user = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    );
    if (user) {
      this.setState({ user });
      blogService.setToken(user.token);
    }
  }

  handleLoginFieldChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleLogin = async event => {
    event.preventDefault();
    try {
      const credentials = {
        username: this.state.username,
        password: this.state.password
      };
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      this.setState({ username: '', password: '', user });
    } catch (err) {
      this.props.showNotification({
        message: `Invalid credentials`,
        type: 'error'
      });
    }
  };

  handleLogout = () => {
    this.props.showNotification({
      message: `${this.state.user.name} has logged out`,
      type: 'info'
    });
    this.setState({ user: null });
    blogService.setToken(null);
    window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  createBlog = async newBlog => {
    try {
      const result = await blogService.create(newBlog);
      this.setState({ blogs: this.state.blogs.concat(result) });
      this.props.showNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} created`,
        type: 'info'
      });
      this.submitBlogForm.toggleVisibility();
    } catch (err) {
      this.props.showNotification({
        message: `Error creating the blog`,
        type: 'error'
      });
    }
  };

  loginForm = () => (
    <Togglable buttonLabel="Login">
      <LoginForm
        username={this.state.username}
        password={this.state.password}
        handleLoginFieldChange={this.handleLoginFieldChange}
        handleLogin={this.handleLogin}
      />
    </Togglable>
  );

  blogView = () => (
    <div className="blog-view">
      <Blogs blogs={this.state.blogs} />
    </div>
  );

  showUserById = id => {
    if (!this.props.users) return <p>Fetching data</p>;
    const user = this.props.users.find(user => user.id === id);
    if (!user) return <p>User not found</p>;
    return <User user={user} />;
  };

  showBlogById = id => {
    if (!this.props.blogs) return <p>Fetching data</p>;
    const blog = this.props.blogs.find(blog => blog.id === id);
    if (!blog) return <p>Blog not found</p>;
    return <Blog key={blog.id} blog={blog} loggedInUser={this.state.user} />;
  };

  showUsers = () => {
    if (!this.props.users) return <p>Fetching data</p>;
    return <Users />;
  };

  render() {
    return !this.state.user ? (
      this.loginForm()
    ) : (
      <BrowserRouter>
        <div>
          <NavBar />
          <Notification />
          <h2>blogs</h2>
          <p>
            {this.state.user.name} logged in{' '}
            <button onClick={this.handleLogout}>Logout</button>
          </p>

          <Togglable
            buttonLabel="Create"
            ref={component => (this.submitBlogForm = component)}
          >
            <SubmitBlogForm createBlog={this.createBlog} />
          </Togglable>

          <div>
            <Route exact path="/" render={this.blogView} />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => this.showBlogById(match.params.id)}
            />
            <Route exact path="/users" render={this.showUsers} />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => this.showUserById(match.params.id)}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({
    users: state.users,
    blogs: state.blogs
  }),
  dispatch => ({
    dispatch,
    initUsers: () => dispatch(userActions.initUsers()),
    initBlogs: () => dispatch(blogActions.initBlogs()),
    showNotification: notification =>
      dispatch(notificationActions.showNotification(notification))
  })
)(App);
