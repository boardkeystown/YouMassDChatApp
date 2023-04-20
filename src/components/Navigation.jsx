import React from 'react'
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';





function mk_logindropdown(sessionData,clearSessionFunc) {
    const logoutHandel = () => {
        clearSessionFunc();
    }
    if (sessionData.username) {
        return (
            <Nav.Link >
                <DropdownButton className="drop" title={sessionData.username} align="end" id="dropdown-menu-align-end">
                    <Dropdown.Item onClick={logoutHandel} >logout</Dropdown.Item>
                    <Dropdown.Item >Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                </DropdownButton>
            </Nav.Link>
        );
    } else {
        return (
            <></>
        );
    }

}
function Navigation({ sessionData,clearSessionFunc }) {
    return (
        <Navbar  id="NavBar" className='navbar_main'>
            <Container>
                <Navbar.Brand href="Home">
                    <img
                        src={require("../assets/Arnie.png")}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Arnies Ass"
                    />
                </Navbar.Brand>
                <Nav className='navbar_links'>
                    <Nav.Link className='navbar_links_effect' href="Home">Home</Nav.Link>
                    <Nav.Link className='navbar_links_effect' href="Boards">Board</Nav.Link>
                    <Nav.Link className='navbar_links_effect' href="About">About</Nav.Link>
                    {mk_logindropdown(sessionData,clearSessionFunc)}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;