import React, { useEffect, useState } from 'react';
import './style.css';
import { Route, Switch } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import NavBar from '../commen/navBar';
import Home from './home/home';
import UserLander from './user/userLander'
import UserProfile from './user/userProfile'
import ResourceLander from './resources/resLander';

function MainLander() {

    const [validUser, setValidUser] = useState(false)
    const [userType, setUserType] = useState('')
    const history = useHistory()

    useEffect(() => {
        const getdata = JSON.parse(localStorage.getItem('HR_Token'))
        if (getdata) {
            setValidUser(true)
            setUserType(getdata.User)
        } else {
            history.push('/')
        }

    }, [history])


    return (
        <section className="py-3 ">
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="bg-white rounded-lg d-block d-flex">
                    <div className='row' style={{ width: '100%', minHeight: '100vh', margin: 'auto' }}>
                        {/* -------Sidebar-------- */}
                        <div className="col-sm-2 shadow rounded-lg">
                            <Navbar expand="lg" className="sidebar border-bottom mt-4">
                                <Navbar.Toggle aria-controls="navbar_toggle" />
                                <Navbar.Collapse id="navbar_toggle">
                                    <Nav className="m-auto flex-column sidebar-nav" activeKey={window.location.pathname}>
                                        <Nav.Link href="/portal" className='pill'><i className="fa fa-desktop fa-lg text-primary m-2"></i>Dash Board</Nav.Link>
                                        {/* <Nav.Link   href="/portal/product" className='pill'><i className="fa fa-cog fa-lg text-primary m-2"></i> Product</Nav.Link> */}

                                        <Nav.Link disabled className='head'>Candidates</Nav.Link>
                                        {/* <Nav.Link   href="/portal/order" className='pill'><i className="fa fa-table fa-lg text-success m-2"></i> Orders</Nav.Link> */}
                                        <Nav.Link href="/portal/resource" className='pill'><i className="fa fa-user-plus fa-lg text-info m-2"></i> Candidates</Nav.Link>

                                        <Nav.Link disabled className=' head'>Users</Nav.Link>
                                        {userType === 'Admin' ? <Nav.Link href="/portal/user" className='pill'><i className="fa fa-user-plus fa-lg text-success m-2"></i> User</Nav.Link>:null}
                                        {userType === 'Employee' ? <Nav.Link href="/portal/user-profile" className='pill'><i className="fa fa-cogs fa-lg text-warning m-2"></i> Profile</Nav.Link>:null}
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>

                        {/* -------Content body-------- */}
                        <div className="col-sm-10 p-2 p-md-2">
                            {validUser ?
                                <Switch>
                                    <Route exact path="/portal" component={Home} />
                                    <Route exact path="/portal/resource" component={ResourceLander} />
                                    {userType  === 'Admin'? <Route exact path="/portal/user" component={UserLander} /> : null}
                                    {userType  === 'Employee'? <Route exact path="/portal/user-profile" component={UserProfile} /> : null}
                                </Switch>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainLander;
