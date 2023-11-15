
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import projectsData from "data/projectdata";



const Tables = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Tables</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sector</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Budget Allocation</th>
                    <th scope="col">Source of Funding</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {projectsData.map((project, index) => (
                    <tr key={index}>
                      <th scope="row">{project.sector}</th>
                      <td>{project.projectName.slice(0, 15)}...</td> 
                      <td>{project.location}</td>
                      <td>{project.budgetAllocation}</td>
                      <td>{project.sourceOfFunding}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Pagination remains unchanged */}
              <CardFooter className="py-4">
                {/* ... */}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};


// const Tables = () => {
//   return (
//     <>
//       <Header />
//       {/* Page content */}
//       <Container className="mt--7" fluid>
//         {/* Table */}
//         <Row>
//           <div className="col">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <h3 className="mb-0">Card tables</h3>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Project</th>
//                     <th scope="col">Budget</th>
//                     <th scope="col">Status</th>
//                     <th scope="col">Users</th>
//                     <th scope="col">Completion</th>
//                     <th scope="col" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                       <td>Home</td>
//                     </tr>
//                 </tbody>
//               </Table>
//               <CardFooter className="py-4">
//                 <nav aria-label="...">
//                   <Pagination
//                     className="pagination justify-content-end mb-0"
//                     listClassName="justify-content-end mb-0"
//                   >
//                     <PaginationItem className="disabled">
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                         tabIndex="-1"
//                       >
//                         <i className="fas fa-angle-left" />
//                         <span className="sr-only">Previous</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem className="active">
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         1
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         2 <span className="sr-only">(current)</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         3
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className="fas fa-angle-right" />
//                         <span className="sr-only">Next</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                   </Pagination>
//                 </nav>
//               </CardFooter>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

export default Tables;
