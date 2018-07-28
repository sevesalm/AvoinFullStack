import React from "react";
import { connect } from "react-redux";
import { filterActions } from "../reducers/filterReducer";

class Filter extends React.Component {
  handleChange = event => {
    this.props.updateFilter(event.target.value);
  };

  render() {
    const style = {
      marginBottom: 10
    };

    return (
      <div style={style}>
        Filter <input onChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter
});

export default connect(
  mapStateToProps,
  { updateFilter: filterActions.update }
)(Filter);
