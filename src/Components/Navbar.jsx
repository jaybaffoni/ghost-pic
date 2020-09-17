import React, { Component } from "react";
import text from "../text.png";
import logo from "../logo.png";
import { NavLink, Link } from "react-router-dom";
import "../index.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#00a6a6" }}
      >
        <Link className="navbar-brand" to="/">
          <img src={logo} style={{ height: 30 }} />
        </Link>
        <Link className="navbar-brand" to="/">
          <img src={text} style={{ height: 30 }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavLink
              className="nav-link"
              exact
              activeClassName="active"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className="nav-link"
              exact
              activeClassName="active"
              to="/services"
            >
              Services
            </NavLink>
            <NavLink
              className="nav-link"
              exact
              activeClassName="active"
              to="/contact"
            >
              Contact
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
