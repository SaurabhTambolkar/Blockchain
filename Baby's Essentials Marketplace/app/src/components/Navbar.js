import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
		  href = ""
          rel="noopener noreferrer"
        >
          Baby's Essentials
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
		  <li>
		  <small className="text-white"><span id="costs">{this.props.costs}</span></small>
		  </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
