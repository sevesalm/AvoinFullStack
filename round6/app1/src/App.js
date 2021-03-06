import React from "react";
import { connect } from "react-redux";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import { anecdoteActions } from "./reducers/anecdoteReducer";
import Filter from "./components/Filter";

class App extends React.Component {
  async componentDidMount() {
    this.props.initAnecdotes();
  }
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    );
  }
}

export default connect(
  null,
  { initAnecdotes: anecdoteActions.initAnecdotes }
)(App);
