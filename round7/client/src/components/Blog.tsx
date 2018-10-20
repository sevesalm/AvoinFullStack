import React from 'react';
import { connect } from 'react-redux';
import { blogActions, IBlog } from '../reducers/blogReducer';
import {
  INotification,
  notificationActions
} from '../reducers/notificationReducer';

import { Button, Typography } from '@material-ui/core';
import { IUser } from '../reducers/userReducer';

const blogStyle = {
  border: 'solid 1px #555',
  borderRadius: '5px',
  margin: '1em',
  padding: '0.5em'
};

const activeBlogStyle = {
  boxShadow: '2px 2px 8px #888'
};

const BlogDetails = ({
  blog,
  incrementLikes,
  handleDeleteClick,
  login,
  askForConfirm
}: {
  blog: IBlog;
  incrementLikes: (blog: IBlog) => void;
  handleDeleteClick: (id: string) => (event: any) => void;
  login: IUser;
  askForConfirm: () => void;
}) => (
  <div className="blog-details">
    <Typography variant="body1">
      <a href={blog.url}>{blog.url}</a>
    </Typography>
    <Typography variant="body1">{blog.likes} likes</Typography>
    <Button
      color="primary"
      variant="contained"
      onClick={() => incrementLikes(blog)}
    >
      Like
    </Button>{' '}
    {(!blog.user || (login && blog.user.username === login.username)) && (
      <Button
        color="default"
        variant="contained"
        onClick={handleDeleteClick(blog.id)}
      >
        {askForConfirm ? 'Confirm?' : 'Delete'}
      </Button>
    )}
    <Typography variant="body1">
      added by {blog.user && blog.user.name ? blog.user.name : 'Unknown'}
    </Typography>
    {blog.comments.length ? (
      <div className="blog-comments">
        <Typography variant="body1">Comments</Typography>
        <ul>
          {blog.comments.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    ) : (
      <Typography variant="body1">No comments</Typography>
    )}
  </div>
);

export class Blog extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      askForConfirm: false,
      comment: '',
      timer: null
    };
  }

  public componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  public handleDeleteClick = (id: string) => () => {
    if (this.state.askForConfirm) {
      this.props.deleteBlog(id, this.props.login.token);
    } else {
      this.setState({
        askForConfirm: !this.state.askForConfirm,
        timer: setTimeout(() => this.setState({ askForConfirm: false }), 2000)
      });
    }
  };

  public handleInputChange = (event: any) =>
    this.setState({ comment: event.target.value });

  public handleSubmit = async (event: any) => {
    event.preventDefault();
    this.props.commentBlog(this.props.blog.id, this.state.comment);
    this.setState({ comment: '' });
    this.props.showNotification({
      message: `Comment "${this.state.comment}" added to blog "${
        this.props.blog.title
      }"`,
      type: 'info'
    });
  };

  public render() {
    const finalBlogStyle = { ...blogStyle, ...activeBlogStyle };
    return (
      <div className="blog" style={finalBlogStyle}>
        <Typography variant="title" className="blog-title">
          {this.props.blog.title}
        </Typography>
        <Typography variant="body1" className="blog-author">
          by {this.props.blog.author}
        </Typography>
        <BlogDetails
          blog={this.props.blog}
          incrementLikes={this.props.incrementLikes}
          login={this.props.login}
          handleDeleteClick={this.handleDeleteClick}
          askForConfirm={this.state.askForConfirm}
        />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="comment"
            value={this.state.comment}
            onChange={this.handleInputChange}
          />
          <Button type="submit">Add comment</Button>
        </form>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({ login: state.login }),
  (dispatch: any) => ({
    commentBlog: (id: string, comment: string) =>
      dispatch(blogActions.commentBlog(id, comment)),
    deleteBlog: (id: string, token: string) =>
      dispatch(blogActions.deleteBlog(id, token)),
    dispatch,
    incrementLikes: (blog: IBlog) => {
      const updatedBlog = {
        author: blog.author,
        likes: blog.likes + 1,
        title: blog.title,
        url: blog.url,
        user: blog.user ? blog.user._id : null
      };
      dispatch(blogActions.updateBlog(blog.id, updatedBlog));
    },
    showNotification: (notification: INotification) =>
      dispatch(notificationActions.showNotification(notification))
  })
)(Blog);
