import React from "react";
import { connect } from "react-redux";
import { anecdoteActions } from "./../reducers/anecdoteReducer";
import { notificationActions } from "./../reducers/notificationReducer";

class AnecdoteForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();
    const anecdoteData = {
      content: e.target.anecdote.value,
      votes: 0
    };
    this.props.createAnecdote(anecdoteData);
    e.target.anecdote.value = "";

    this.props.showNotification(
      {
        message: "Anecdote created",
        type: "info"
      },
      5
    );
  };
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    dispatch,
    createAnecdote: anecdote =>
      dispatch(anecdoteActions.createAnecdote(anecdote)),
    showNotification: (notification, delay) =>
      dispatch(notificationActions.showNotification(notification, delay))
  })
)(AnecdoteForm);
