import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap'
import { useHistory } from "react-router-dom"

export default function NavBar() {

    const history = useHistory()

    const [userName, setUserName] = useState('')

    useEffect(() => {
        const timeNow = Math.floor(Date.now() / 1000)
        const getdata = JSON.parse(localStorage.getItem('HR_Token'))
        if (getdata) {
            if (getdata.User === 'Admin') {
                setUserName('Admin')
            } else if (getdata.User === 'Employee') {
                const tokenVal = JSON.parse(atob(getdata.Tokens.split('.')[1]));
                setUserName(tokenVal.Name)
                if (tokenVal.exp < timeNow) {
                    localStorage.removeItem('HR_Token');
                    history.push('/')
                }
            }
        }
    }, [history])

    const handleLogout = () => {
        localStorage.removeItem('HR_Token');
        history.push('/')
    }


    return (
        <Navbar expand="lg" className="navbar shadow">
            <Form className="container-fluid">
                <Navbar.Brand><a className="navbar-brand ml-4" href="/">HR Portal </a></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar_toggle" />
                <Navbar.Collapse id="navbar_toggle">
                    <Nav className="m-auto navbar-nav">
                        <div className="d-flex">
                            {/* <div className="input-group m-1 border rounded-pill p-1">
                            <input type="search" placeholder="Searching for?" aria-describedby="button-addon4" className="form-control"/>
                            <div className="input-group-append border-0">
                            <button id="button-addon4" type="button" className="btn btn-link text-info"><i className="fa fa-search"></i></button>
                            </div>
                        </div> */}
                        </div>
                    </Nav>
                    <Nav className="ml-auto navbar-nav mr-5" activeKey={window.location.pathname}>
                        {/* <NavDropdown title="Profile" id="nav-dropdown" renderMenuOnMount={true}> 
                            <NavDropdown.ItemText className="text-info text-center">Welcome!</NavDropdown.ItemText>
                            <NavDropdown.Item href="/employers/dashboard" id="nav-dropdown-item"><i className="fa fa-desktop m-2"></i>Dashboard</NavDropdown.Item>
                            <NavDropdown.Item href="/employers/dashboard/jobs" id="nav-dropdown-item"><i className="fa fa-user m-2"></i> Users</NavDropdown.Item>
                            <NavDropdown.Item href="/employers/dashboard/payment" id="nav-dropdown-item"><i className="fa fa-cogs m-2"></i> Settings</NavDropdown.Item>
                        </NavDropdown> */}
                        <Nav.Link style={{fontWeight:600, fontSize:14}}>Hi {userName}</Nav.Link>
                        <Nav.Link onClick={handleLogout} style={{fontWeight:600, fontSize:14,color:'red'}}>
                            <i className="fa fa-sign-out fa-lg"></i> Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Form>
        </Navbar>
    )
}