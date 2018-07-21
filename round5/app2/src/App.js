import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

class App extends Component {
  render() {
    const total =
      store.getState().good + store.getState().ok + store.getState().bad;
    return (
      <div>
        <h1>Anna palautetta</h1>
        <button onClick={() => store.dispatch({ type: "GOOD" })}>Hyvä</button>
        <button onClick={() => store.dispatch({ type: "OK" })}>
          Neutraali
        </button>
        <button onClick={() => store.dispatch({ type: "BAD" })}>Huono</button>
        <h1>Statistiikka</h1>
        <table>
          <tbody>
            <tr>
              <td>hyvä</td>
              <td>{store.getState().good}</td>
            </tr>
            <tr>
              <td>neutraali</td>
              <td>{store.getState().ok}</td>
            </tr>
            <tr>
              <td>huono</td>
              <td>{store.getState().bad}</td>
            </tr>
            <tr>
              <td>hyviä</td>
              <td>
                {total
                  ? Math.round(1000 * (store.getState().good / total)) / 10
                  : 0}{" "}
                %
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => store.dispatch({ type: "ZERO" })}>
          nollaa tilasto
        </button>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

render();
store.subscribe(render);

export default App;
