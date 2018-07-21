import React from "react";

const actionFor = {
  voteAnecdote(id) {
    return {
      type: "VOTE",
      data: {
        id
      }
    };
  },

  addAnecdote(content) {
    return {
      type: "ADD_NEW",
      data: {
        content
      }
    };
  }
};

class App extends React.Component {
  vote = id => () => {
    this.props.store.dispatch(actionFor.voteAnecdote(id));
  };

  addNew = event => {
    event.preventDefault();
    this.props.store.dispatch(
      actionFor.addAnecdote(event.target.content.value)
    );
    event.target.content.value = "";
  };

  render() {
    const anecdotes = this.props.store
      .getState()
      .sort((a, b) => b.votes - a.votes);
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form onSubmit={this.addNew}>
          <div>
            <input name="content" />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
  }
}

export default App;
