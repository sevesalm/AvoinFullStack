import React from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import SubmitBlogForm from "./components/SubmitBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

export const LOCAL_STORAGE_USER_KEY = "loggedInBlogsUser";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user: null,
      notification: null,
      blogs: []
    };
  }

  async componentDidMount() {
    const blogs = await blogService.getAll();
    this.setState({ blogs });
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
      this.setState({ username: "", password: "", user });
    } catch (err) {
      this.updateNotification("Invalid credentials", "error");
    }
  };

  handleLogout = () => {
    this.updateNotification(`${this.state.user.name} has logged out`, "info");
    this.setState({ user: null });
    blogService.setToken(null);
    window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  incrementLikes = blog => async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user ? blog.user._id : null
    };
    const result = await blogService.update(blog.id, updatedBlog);

    this.setState({
      blogs: this.state.blogs.filter(item => item.id !== blog.id).concat(result)
    });
  };

  updateNotification = (message, type = "info") => {
    this.setState({
      notification: { message, type }
    });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 2000);
  };

  createBlog = async newBlog => {
    try {
      const result = await blogService.create(newBlog);
      this.setState({ blogs: this.state.blogs.concat(result) });
      this.updateNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} created`,
        "info"
      );
      this.submitBlogForm.toggleVisibility();
    } catch (err) {
      this.updateNotification("Error creating the blog", "error");
    }
  };

  deleteBlog = id => {
    blogService.deleteBlog(id);
    this.setState({ blogs: this.state.blogs.filter(item => item.id !== id) });
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
      <h2>blogs</h2>
      <Togglable
        buttonLabel="Create"
        ref={component => (this.submitBlogForm = component)}
      >
        <SubmitBlogForm createBlog={this.createBlog} />
      </Togglable>

      <p>
        {this.state.user.name} logged in{" "}
        <button onClick={this.handleLogout}>Logout</button>
      </p>
      <Blogs
        blogs={this.state.blogs}
        incrementLikes={this.incrementLikes}
        loggedInUser={this.state.user}
        deleteBlog={this.deleteBlog}
      />
    </div>
  );

  render() {
    return (
      <div>
        <Notification data={this.state.notification} />
        {!this.state.user ? this.loginForm() : this.blogView()}
      </div>
    );
  }
}

export default App;
