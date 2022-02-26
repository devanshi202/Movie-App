import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './navBar.css';
export default class NavBar extends Component {
  render() {
    return <div className = "navBarDiv">
        
        <nav className='nav-class'>
        <h2>logo</h2>
          <ul className='ul'>
            <Link to='/'>
                <li>home</li>
            </Link>
            <Link to='/movie'>
                <li>movies</li>
            </Link>
            <Link to='/about'>
                <li>About</li>
            </Link>
          </ul>
      </nav>

    </div>;
  }
}
