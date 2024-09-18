import React, { useContext } from 'react';
import './nav.scss';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.svg'
import { logOutUser } from '../../services/userService'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
const NavHeader = () => {
    const { user , logoutContext } = useContext(UserContext);
    const location = useLocation();
    const history = useHistory()

    const handlelogOutUser = async () => {
        let data = await logOutUser()//clear cookie
        localStorage.removeItem("jwt")//clear local storage
        logoutContext();//clear user in context
        if (data && +data.EC === 0) {
            toast.success("log out success")
            history.push("/login")
        }
        else {
            toast.error(data.EM)
        }

    }
    // Kiểm tra điều kiện để hiển thị Navbar
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className='nav_header'>
                    <Navbar bg='header' expand='lg'>
                        <Container>
                            <Navbar.Brand href='#home'>
                                <img src={logo}
                                    width="30"
                                    height="30"
                                    className='d-inline-block alin-top'

                                >
                                </img>
                                <span className='brandName'></span>
                                React
                            </Navbar.Brand>

                            <Navbar.Toggle aria-controls='basic-navbar-nav' />
                            <Navbar.Collapse id='basic-navbar-nav'>
                                <Nav className='me-auto'>
                                    <NavLink to='/' className='nav-link' exact>Home</NavLink>
                                    <NavLink to='/users' className='nav-link'>Users</NavLink>
                                    <NavLink to='/roles' className='nav-link'>Roles</NavLink>
                                    <NavLink to='/group-role' className='nav-link'>Group Role</NavLink>
                                    <NavLink to='/projects' className='nav-link'>Projects</NavLink>
                                    <NavLink to='/about' className='nav-link'>About</NavLink>

                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <Nav.Item className='nav-link' >
                                                Welcome {user.account.username}
                                            </Nav.Item>
                                            <NavDropdown title='Settings' id='basic-nav-dropdown'>
                                                <NavDropdown.Item >

                                                    Change Password</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item >
                                                    <span onClick={() => handlelogOutUser()}>
                                                        Log Out  </span></NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className='nav-link' to='/login'>
                                            Login {user.account.username}
                                        </Link>


                                    }



                                </Nav>
                            </Navbar.Collapse>
                        </Container>

                    </Navbar>
                </div>

            </>
        );
    } else {
        return null; // Trả về null khi không hiển thị Navbar
    }
};

export default NavHeader;