import React from "react";
import { connect } from "react-redux";

class Notification extends React.Component {
  render() {
    const style = {
      border: "solid",
      padding: 10,
      borderWidth: 1
    };
    return (
      this.props.notification && (
        <div style={style}>{this.props.notification.message}</div>
      )
    );
  }
}

function mapStateToProps(state) {
  return { notification: state.notification };
}

export default connect(mapStateToProps)(Notification);
