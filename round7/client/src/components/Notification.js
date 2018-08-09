import React from "react";
import { connect } from "react-redux";

const infoStyle = {
  background: "#efe",
  border: "solid 1px #afa"
};

// const errorStyle = {
//   background: "#fee",
//   border: "solid 1px #faa"
// };

const Notification = ({ notification }) =>
  notification && <div style={infoStyle}>{notification.message}</div>;

function mapStateToProps(state) {
  return { notification: state.notification };
}

export default connect(mapStateToProps)(Notification);
