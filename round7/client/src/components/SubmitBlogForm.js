import React from "react";

class SubmitBlogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      url: ""
    };
  }

  handleInputChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = async event => {
    event.preventDefault();
    const newBlog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    };

    this.props.createBlog(newBlog);
    this.setState({
      title: "",
      author: "",
      url: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Title
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default SubmitBlogForm;
