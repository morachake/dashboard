
import InputForm from 'components/Dashboard/InputForms';
import TopTabs from 'components/Dashboard/TopTabs';
import UserHeader from 'components/Headers/UserHeader';
import React, { useState } from 'react';
import {
    Container,
    Button, 
    Card,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    Col,
    CardText,
    CardTitle
} from 'reactstrap';

export default function DataForm() {
    const [activeTab, setActiveTab] = useState('1');

    // Function to toggle the active tab
    const toggleTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <>
            <UserHeader />
            <Container className="mt--7" >  
                 <Card className='p-5'>
                 <Nav tabs>
                    <NavItem className='custom-tab'>
                        <NavLink
                            className={activeTab === '1' ? 'active' : ''}
                            onClick={() => toggleTab('1')}
                        >
                          <Button color={activeTab === '1' ? 'primary' :'secondary'}>New Project</Button>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === '2' ? 'active' : ''}
                            onClick={() => toggleTab('2')}
                        >
                            <Button color={activeTab === '2' ? 'primary' : 'secondary'}>New Program</Button>
                        </NavLink>
                    </NavItem>
                    </Nav> 
                
                
                <TabContent activeTab={activeTab}>
                    <TabPane tabId='1'>
                        {/* <Row> */}
                            <Col className="mb-5 mb-xl-0 p-3" xl="8">      
                                <InputForm/>
                            </Col>
                           
                        {/* </Row> */}
                    </TabPane>
                    <TabPane tabId='2'>
                        <Row>
                             <Col xl="4 p-3">
                               <Button>A new </Button>
                            </Col> 
                        </Row>
                    </TabPane>
                </TabContent>  
            </Card>     
        </Container>
        </>
    );
}