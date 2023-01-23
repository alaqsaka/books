import React from "react";
import PropTypes from "prop-types";

const Button = ({ color, children, onClick, type }) => {
  let colors;

  switch (color) {
    case "red":
      colors =
        "button-action__base book-item__delete-button book-item__delete-button:hover ";
      break;
    case "yellow":
      colors =
        "button-action__base book-item__archive-button book-item__archive-button:hover ";
      break;
    default:
      colors = "button__base";
  }

  return (
    <button type={type ? type : ""} className={colors} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Button;
