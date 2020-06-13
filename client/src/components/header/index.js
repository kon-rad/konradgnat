import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <nav
      id="home"
      className="nav navbar-default navbar-fixed-top"
      role="navigation"
    >
      <div className="container">
        <div className="navbar-header">
          <div
            id="menuToggle"
            className="container-button"
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <a className="navbar-brand" href="/">
            <i className="fa fa-code" aria-hidden="true"></i>
          </a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
