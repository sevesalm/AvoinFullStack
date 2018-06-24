import React from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
);
const Feedback = ({ handleGood, handleNeutral, handleBad }) => (
  <div>
    <h1>Give feedback</h1>
    <Button handleClick={handleGood}>Good</Button>
    <Button handleClick={handleNeutral}>Neutral</Button>
    <Button handleClick={handleBad}>Bad</Button>
  </div>
);

const Stat = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);

const Stats = ({ stats: { good, neutral, bad, history } }) => {
  const sum = history.reduce((acc, cur) => acc + cur, 0);
  const count = history.length;
  return (
    <div>
      <h1>Stats</h1>
      <table>
        <tbody>
          <Stat
            label="Good"
            value={`${good} (${
              count ? Math.round((100 * good) / count) : "0"
            } %)`}
          />
          <Stat label="Neutral" value={neutral} />
          <Stat label="Bad" value={bad} />
          <Stat
            label="Avg"
            value={count ? Math.round((100 * sum) / count) / 100 : 0}
          />
        </tbody>
      </table>
    </div>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
      history: []
    };
  }

  incStat = (property, value) => () =>
    this.setState({
      [property]: this.state[property] + 1,
      history: this.state.history.concat(value)
    });

  render() {
    return (
      <div>
        <Feedback
          handleGood={this.incStat("good", 1)}
          handleNeutral={this.incStat("neutral", 0)}
          handleBad={this.incStat("bad", -1)}
        />
        {!!this.state.history.length && <Stats stats={this.state} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
