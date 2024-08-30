import React from 'react';
import './nav.scss'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="topnav">
            <NavLink  to="/" exact>Home</NavLink>
            <NavLink to="/news" >News</NavLink>
            <NavLink to="/contact" >Contact</NavLink>
            <NavLink to="/about" >About</NavLink>
        </div>
    );
}

export default Nav;