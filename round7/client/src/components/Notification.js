import React from "react";
import PropTypes from "prop-types";

const infoStyle = {
  background: "#efe",
  border: "solid 1px #afa"
};

const errorStyle = {
  background: "#fee",
  border: "solid 1px #faa"
};

const Notification = ({ data }) =>
  data ? (
    <div style={data.type === "error" ? errorStyle : infoStyle}>
      {data.message}
    </div>
  ) : null;

Notification.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  })
};

export default Notification;
