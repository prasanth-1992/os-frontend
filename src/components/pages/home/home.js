import React from 'react';
import {Tabs, Tab,  Row,  Col} from "react-bootstrap";

import {NonItLander,ItLander} from '../order/orderLander';
import UserHome from '../order/userHome';
// import AdminProfile from '../profile/adminProfile';

function Home() {


  return (
    <div className=''>
    <Row>
        <Col>
            <Tabs defaultActiveKey="it" 
                  id="controlled-tab-example">
                <Tab eventKey="it" title="IT Sector">
                    <ItLander />
                </Tab>
                <Tab eventKey="nonit" title="Non-IT Sector">
                    <NonItLander />
                </Tab>
                <Tab eventKey="profile" title="Users">
                    <UserHome />
                </Tab>
                {/* <Tab eventKey="product" title="Product" >
                </Tab> */}
            </Tabs>
        </Col>
    </Row>
</div>
  );
}

export default Home;
