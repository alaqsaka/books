import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeConsumer } from "../contexts/ThemeContext";
import PropTypes from "prop-types";

const BookAppHeader = ({ logout, name }) => {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <header>
            <h1>
              <Link to="/">Books</Link>
            </h1>
            <nav className="navigation">
              <ul>
                <li>
                  <button className="button-logout" onClick={logout}>
                    {name} <FiLogOut />
                  </button>
                </li>
                <li>
                  <button className="toggle-theme" onClick={toggleTheme}>
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                  </button>
                </li>
              </ul>
            </nav>
          </header>
        );
      }}
    </ThemeConsumer>
  );
};

BookAppHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default BookAppHeader;
