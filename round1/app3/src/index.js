import React from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const Stats = ({ votes, anecdotes }) => {
  console.log({ votes });
  const maxIndex = votes.reduce(
    (prev, curr, idx, arr) => (curr > arr[prev] ? idx : prev),
    0
  );
  console.log(maxIndex);
  return (
    <div>
      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {votes[maxIndex]} votes</p>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      votes: new Array(this.props.anecdotes.length).fill(0)
    };
  }

  voteHandler = () => {
    const { votes, selected } = this.state;
    const newVotes = [...votes];
    newVotes[selected] += 1;
    return this.setState({
      votes: newVotes
    });
  };

  nextHandler = () =>
    this.setState({
      selected: Math.floor(Math.random() * anecdotes.length)
    });

  render() {
    const { votes, selected } = this.state;
    return (
      <div>
        <p>{this.props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <Button onClick={this.nextHandler}>Next</Button>
        <Button onClick={this.voteHandler}>Vote</Button>
        <Stats votes={votes} anecdotes={this.props.anecdotes} />
      </div>
    );
  }
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
