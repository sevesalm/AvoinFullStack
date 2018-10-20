import React from 'react';
import { connect } from 'react-redux';

import { Button, TextField } from '@material-ui/core';

const dialogStyle = {
  padding: '0 2em',
  width: '100%'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column'
};

class SubmitBlogForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      author: '',
      title: '',
      url: ''
    };
  }

  public handleInputChange = (event: any) =>
    this.setState({ [event.target.id]: event.target.value });

  public handleSubmit = async (event: any) => {
    event.preventDefault();
    const newBlog = {
      author: this.state.author,
      title: this.state.title,
      url: this.state.url
    };
    this.props.createBlog(newBlog, this.props.login.token);
    this.setState({
      author: '',
      title: '',
      url: ''
    });
    this.props.togglePanel();
  };

  public render() {
    return (
      <div style={dialogStyle}>
        <div style={formStyle}>
          <TextField
            id="title"
            label="Title"
            value={this.state.title}
            margin="normal"
            onChange={this.handleInputChange}
            autoComplete="off"
          />
          <TextField
            id="author"
            label="Author"
            value={this.state.author}
            margin="normal"
            onChange={this.handleInputChange}
            autoComplete="off"
          />
          <TextField
            id="url"
            label="Url"
            value={this.state.url}
            margin="normal"
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={this.handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginLeft: 10 }}
          >
            Create
          </Button>
        </div>
      </div>
    );
  }
}

export default connect((state: any) => ({ login: state.login }))(
  SubmitBlogForm
);
