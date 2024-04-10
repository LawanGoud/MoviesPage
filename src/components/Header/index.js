import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./index.css";

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container">
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <h1 className="heading">Movie Db</h1>
      <div className={`search-container ${menuOpen ? "show" : ""}`}>
        <ul className={`list-container ${menuOpen ? "show" : ""}`}>
          <li>
            <Link className="nav-link" to="/" onClick={toggleMenu}>
              Popular
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/toprated" onClick={toggleMenu}>
              Top Rated
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/upcoming" onClick={toggleMenu}>
              Upcoming
            </Link>
          </li>
        </ul>
        <form
          onSubmit={handleSubmit}
          className={`search-form ${menuOpen ? "show" : ""}`}
        >
          <input
            type="search"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Movie Name"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
