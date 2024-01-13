import React from 'react';
import {
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

export default function TopTabs() {
  return (
   <div>
  <Nav tabs>
    <NavItem>
      <NavLink
        className="active"
        onClick={function noRefCheck(){}}
      >
        Tab1
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className=""
        onClick={function noRefCheck(){}}
      >
        More Tabs
      </NavLink>
    </NavItem>
  </Nav>
  <TabContent activeTab="1">
    <TabPane tabId="1">
      <Row>
        <Col sm="12">
          <h4>
            Tab 1 Contents
          </h4>
        </Col>
      </Row>
    </TabPane>
    <TabPane tabId="2">
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle>
              Special Title Treatment
            </CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional content.
            </CardText>
            <Button>
              Go somewhere
            </Button>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle>
              Special Title Treatment
            </CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional content.
            </CardText>
            <Button>
              Go somewhere
            </Button>
          </Card>
        </Col>
      </Row>
    </TabPane>
  </TabContent>
</div>
  );
}
