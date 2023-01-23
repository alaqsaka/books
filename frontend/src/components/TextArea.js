import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ placeholder, value, onChange, required }) => {
  return (
    <div className="search-bar">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

TextArea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default TextArea;
