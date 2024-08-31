import React, { useEffect, useState } from 'react';
import './nav.scss'
import { NavLink , useLocation } from 'react-router-dom'


const Nav = () => {
    const [iShow, setIshow] = useState(true)
    let location = useLocation()
    useEffect(() => {
       
        if (location.pathname ==='/login') {
            setIshow(false)
        }

    }, [])
    return (
        <>
        { iShow == true &&
            <div className="topnav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/users" >Users</NavLink>
                <NavLink to="/projects" >Projects</NavLink>
                <NavLink to="/about" >About</NavLink>
            </div>
}
        </>
    );
}

export default Nav;