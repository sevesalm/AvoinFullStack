import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import {
  Dialog,
  DialogTitle,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import SubmitBlogForm from './components/SubmitBlogForm';
import User from './components/User';
import Users from './components/Users';
import { blogActions, IBlog } from './reducers/blogReducer';
import { loginActions } from './reducers/loginReducer';
import {
  INotification,
  notificationActions
} from './reducers/notificationReducer';
import { IUser, userActions } from './reducers/userReducer';
import { ICredentials } from './services/login';

export const LOCAL_STORAGE_USER_KEY = 'loggedInBlogsUser';

export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoginDialogOpen: false,
      isPanelExpanded: false,
      password: '',
      username: ''
    };
  }

  public togglePanel = () =>
    this.setState({ isPanelExpanded: !this.state.isPanelExpanded });

  public async componentDidMount() {
    this.props.initUsers();
    this.props.initBlogs();

    const user: IUser | null = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_USER_KEY) || 'null'
    );
    if (user) {
      this.props.setUser(user);
    }
  }

  public handleLoginFieldChange = (event: any) =>
    this.setState({ [event.target.id]: event.target.value });

  public handleLogin = async (event: any) => {
    event.preventDefault();
    const credentials = {
      password: this.state.password,
      username: this.state.username
    };
    this.setState({ username: '', password: '', isLoginDialogOpen: false });
    this.props.loginUser(credentials);
  };

  public handleLogout = () => {
    this.props.logoutUser(this.props.login.name);
  };

  public toggleDialog = () => {
    this.setState({
      isLoginDialogOpen: !this.state.isLoginDialogOpen,
      password: '',
      username: ''
    });
  };

  public createBlog = async (newBlog: IBlog, token: string) => {
    try {
      this.props.createBlog(newBlog, token);

      this.props.showNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} created`,
        type: 'info'
      });
    } catch (err) {
      this.props.showNotification({
        message: 'Error creating the blog',
        type: 'error'
      });
    }
  };

  public blogView = () => (
    <div className="blog-view">
      <Blogs />
    </div>
  );

  public showUserById = (id: string) => {
    if (!this.props.users) {
      return <p>Fetching data</p>;
    }
    const foundUser = this.props.users.find((user: IUser) => user.id === id);
    if (!foundUser) {
      return <p>User not found</p>;
    }
    return <User user={foundUser} />;
  };

  public showBlogById = (id: string) => {
    if (!this.props.blogs) {
      return <p>Fetching data</p>;
    }
    const foundBlog = this.props.blogs.find((blog: IBlog) => blog.id === id);
    if (!foundBlog) {
      return <p>Blog not found</p>;
    }
    return (
      <Blog
        key={foundBlog.id}
        blog={foundBlog}
        loggedInUser={this.props.login}
      />
    );
  };

  public showUsers = () => {
    if (!this.props.users) {
      return <p>Fetching data</p>;
    }
    return <Users />;
  };

  public render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar
            user={this.props.login}
            handleLogout={this.handleLogout}
            toggleDialog={this.toggleDialog}
          />
          <Notification />
          <Dialog
            className="login-modal"
            aria-labelledby="simple-dialog-title"
            open={this.state.isLoginDialogOpen}
            onClose={this.toggleDialog}
          >
            <DialogTitle id="simple-dialog-title">Login</DialogTitle>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleLogin={this.handleLogin}
              handleLoginFieldChange={this.handleLoginFieldChange}
              toggleDialog={this.toggleDialog}
            />
          </Dialog>
          <div style={{ maxWidth: '50em', margin: 'auto' }}>
            <Typography variant="display1" color="inherit" align="center">
              Blogs
            </Typography>

            {this.props.login && (
              <ExpansionPanel
                onChange={this.togglePanel}
                expanded={this.state.isPanelExpanded}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Create a new blog</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <SubmitBlogForm
                    togglePanel={this.togglePanel}
                    createBlog={this.createBlog}
                  />{' '}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}

            <div>
              <Route exact={true} path="/" render={this.blogView} />
              <Route
                exact={true}
                path="/blogs/:id"
                render={({ match }) => this.showBlogById(match.params.id)}
              />
              <Route exact={true} path="/users" render={this.showUsers} />
              <Route
                exact={true}
                path="/users/:id"
                render={({ match }) => this.showUserById(match.params.id)}
              />
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  (state: any) => ({
    blogs: state.blogs,
    login: state.login,
    users: state.users
  }),
  (dispatch: any) => ({
    createBlog: (blog: IBlog, token: string) =>
      dispatch(blogActions.createBlog(blog, token)),
    dispatch,
    initBlogs: () => dispatch(blogActions.initBlogs()),
    initUsers: () => dispatch(userActions.initUsers()),
    loginUser: (credentials: ICredentials) =>
      dispatch(loginActions.loginUser(credentials)),
    logoutUser: (name: string) => dispatch(loginActions.logoutUser(name)),
    setUser: (user: IUser) => dispatch(loginActions.setUser(user)),
    showNotification: (notification: INotification) =>
      dispatch(notificationActions.showNotification(notification))
  })
)(App);
