import React from "react";
import "./index.css";
import PropTypes from "prop-types";

const Anouncement = ({ type, message }) => {
  return (
    <div className={type === "error" ? "error" : "success"}>{message}</div>
  );
};
Anouncement.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};
export default Anouncement;
