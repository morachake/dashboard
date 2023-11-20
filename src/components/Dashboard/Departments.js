import React from 'react';
import { Button, Card, CardHeader, Progress, Row, Table } from 'reactstrap';

export default function Departments() {
  return (
    <>
        <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Latest Messages</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">From</th>
                    <th scope="col">Message</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Jomvu</th>
                    <td>Road update</td>
                  </tr>
                  <tr>
                    <th scope="row">Jomvu</th>
                    <td>Road update</td>
                  </tr>
                  <tr>
                    <th scope="row">Jomvu</th>
                    <td>Road update</td>
                  </tr>
                  <tr>
                    <th scope="row">Jomvu</th>
                    <td>Road update</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
    </>
  );
}
