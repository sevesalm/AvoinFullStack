import React from "react";
import { connect } from "react-redux";
import { anecdoteActions } from "../reducers/anecdoteReducer";
import { notificationActions } from "../reducers/notificationReducer";

class AnecdoteList extends React.Component {
  voteAnecdote = id => async () => {
    const anecdote = {
      ...this.props.anecdotesToShow.find(item => item.id === id)
    };
    anecdote.votes += 1;
    this.props.voteAnecdote(anecdote);
    this.props.showNotification(
      {
        message: `You voted ${anecdote.content}`,
        type: "info"
      },
      5
    );
  };

  render() {
    const anecdotes = this.props.anecdotesToShow;
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  anecdotesToShow: state.anecdotes.filter(item =>
    item.content.toLowerCase().includes(state.filter.toLowerCase())
  )
});

export default connect(
  mapStateToProps,
  dispatch => ({
    dispatch,
    voteAnecdote: id => dispatch(anecdoteActions.voteAnecdote(id)),
    showNotification: (notification, delay) =>
      dispatch(notificationActions.showNotification(notification, delay))
  })
)(AnecdoteList);
