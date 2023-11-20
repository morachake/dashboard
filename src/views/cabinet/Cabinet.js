
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  chartOptions,
  parseOptions
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import ProjectsTable from "components/Dashboard/ProjectsTable";
// import Departments from "components/Dashboard/Departments";
import projectsData from "data/projectdata";
import BudgetChart from "components/Dashboard/BudgetChart";
import BudgetBars from "components/Dashboard/BudgetBars";

const Cabinet = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [sectorFilter, setSectorFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredData, setFilteredData] = useState(projectsData);

  // Handler functions for filter changes
  const handleSectorChange = (e) => {
    setSectorFilter(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
  };

  // Effect to filter data when filters change
  useEffect(() => {
    let data = projectsData;

    if (sectorFilter) {
      data = data.filter(project => project.sector === sectorFilter);
    }

    if (locationFilter) {
      data = data.filter(project => project.location === locationFilter);
    }

    setFilteredData(data);
  }, [sectorFilter, locationFilter]);
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    //setChartExample1Data("data" + index);
  };
  const uniqueSectors = Array.from(new Set(projectsData.map(project => project.sector)));
  const uniqueLocations = Array.from(new Set(projectsData.map(project => project.location)));

  return (
    <>
      <Header
        onSectorChange={handleSectorChange}
        onLocationChange={handleLocationChange}
        sectors={uniqueSectors}
        locations={uniqueLocations}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <BudgetBars
                    projectsData={filteredData}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <BudgetChart projectsData={filteredData}/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <ProjectsTable/>
          </Col>
       
        </Row>
      </Container>
    </>
  );
};

export default Cabinet;
