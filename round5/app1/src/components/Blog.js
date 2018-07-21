import React from "react";

const blogStyle = {
  padding: "0.5em",
  margin: "1em",
  border: "solid 1px #555",
  borderRadius: "5px"
};

const activeBlogStyle = {
  boxShadow: "2px 2px 8px #888"
};

const detailStyle = {
  margin: "0.5em 0 0 0.5em"
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
      {likes} likes <button onClick={incrementLikes(blog)}>Like</button>
    </div>
    <div>added by {user && user.name ? user.name : "Unknown"}</div>
    {(!user || user.username === loggedInUser.username) && (
      <button onClick={handleDeleteClick(id)}>
        {askForConfirm ? "Confirm?" : "Delete"}
      </button>
    )}
  </div>
);

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      askForConfirm: false
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  toggleVisibility = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

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
    const finalBlogStyle = this.state.showDetails
      ? { ...blogStyle, ...activeBlogStyle }
      : blogStyle;
    return (
      <div className="blog" style={finalBlogStyle}>
        <span className="blog-title" onClick={this.toggleVisibility}>
          {this.props.blog.title}
        </span>{" "}
        {this.props.blog.author}
        {this.state.showDetails && (
          <BlogDetails
            className="blog-details"
            blog={this.props.blog}
            incrementLikes={this.props.incrementLikes}
            loggedInUser={this.props.loggedInUser}
            handleDeleteClick={this.handleDeleteClick}
            askForConfirm={this.state.askForConfirm}
          />
        )}
      </div>
    );
  }
}

export default Blog;
