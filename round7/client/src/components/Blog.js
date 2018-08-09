import React from 'react';
import { connect } from 'react-redux';
import { blogActions } from '../reducers/blogReducer';

const blogStyle = {
  padding: '0.5em',
  margin: '1em',
  border: 'solid 1px #555',
  borderRadius: '5px'
};

const activeBlogStyle = {
  boxShadow: '2px 2px 8px #888'
};

const detailStyle = {
  margin: '0.5em 0 0 0.5em'
};

const BlogDetails = ({
  blog,
  blog: { id, url, likes, user },
  incrementLikes,
  loggedInUser,
  handleDeleteClick,
  askForConfirm
}) => (
  <div style={detailStyle}>
    <a href={url}>{url}</a>
    <div>
      {likes} likes <button onClick={() => incrementLikes(blog)}>Like</button>
    </div>
    <div>added by {user && user.name ? user.name : 'Unknown'}</div>
    {(!user || user.username === loggedInUser.username) && (
      <button onClick={handleDeleteClick(id)}>
        {askForConfirm ? 'Confirm?' : 'Delete'}
      </button>
    )}
  </div>
);

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      askForConfirm: false
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleDeleteClick = id => () => {
    if (this.state.askForConfirm) {
      this.props.deleteBlog(id);
    } else {
      this.setState({ askForConfirm: !this.state.askForConfirm });
      this.timer = setTimeout(
        () => this.setState({ askForConfirm: false }),
        2000
      );
    }
  };

  render() {
    const finalBlogStyle = { ...blogStyle, ...activeBlogStyle };
    return (
      <div className="blog" style={finalBlogStyle}>
        <span className="blog-title">{this.props.blog.title}</span>{' '}
        {this.props.blog.author}
        <BlogDetails
          className="blog-details"
          blog={this.props.blog}
          incrementLikes={this.props.incrementLikes}
          loggedInUser={this.props.loggedInUser}
          handleDeleteClick={this.handleDeleteClick}
          askForConfirm={this.state.askForConfirm}
        />
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    dispatch,
    incrementLikes: blog => {
      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user ? blog.user._id : null
      };
      dispatch(blogActions.updateBlog(blog.id, updatedBlog));
    },
    deleteBlog: id => dispatch(blogActions.deleteBlog(id))
  })
)(Blog);
