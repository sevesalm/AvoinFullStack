import React, { Component } from "react";
import axios from "axios";

const Search = ({ handleInputChange, value }) => (
  <div>
    Find countries: <input onChange={handleInputChange} value={value} />
  </div>
);

const Country = ({ data: { name, capital, flag, population } }) => {
  const flagImgStyle = {
    background: `url(${flag}) no-repeat center center`,
    backgroundSize: "contain",
    width: 400,
    height: 300
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <div style={flagImgStyle} />
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      newInput: "",
      countries: []
    };
  }
  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => this.setState({ countries: res.data }));
  }

  handleInputChange = event => this.setState({ newInput: event.target.value });

  handleClick = name => _ => this.setState({ newInput: name });

  render() {
    const countriesToShow = this.state.countries.filter(
      item =>
        item.name.toLowerCase().indexOf(this.state.newInput.toLowerCase()) !==
        -1
    );

    return (
      <div>
        <Search
          handleInputChange={this.handleInputChange}
          value={this.state.newInput}
        />
        {countriesToShow.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {countriesToShow.length > 1 &&
          countriesToShow.length <= 10 && (
            <ul>
              {countriesToShow.map(item => (
                <li onClick={this.handleClick(item.name)} key={item.alpha3Code}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        {countriesToShow.length === 1 && <Country data={countriesToShow[0]} />}
      </div>
    );
  }
}

export default App;
