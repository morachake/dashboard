// Import required components and hooks from 'react-data-grid' and other necessary libraries
import DataGrid from 'react-data-grid';
import { useState } from 'react';
import { Card, CardFooter, CardHeader, Container, Row, Button } from 'reactstrap';
import Header from 'components/Headers/Header';
import projectsData from 'data/projectdata';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Define a function to convert the data to CSV
const downloadCSV = (arrayOfObjects) => {
  const replacer = (key, value) => (value === null ? '' : value); 
  const header = Object.keys(arrayOfObjects[0]);
  const csv = [
    header.join(','), 
    ...arrayOfObjects.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'projectsData.csv');
};
const downloadPDF = async (htmlElement) => {
  const canvas = await html2canvas(htmlElement);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'landscape',
  });
  pdf.addImage(imgData, 'PNG', 0, 0);
  pdf.save('projectsData.pdf');
};

const Tables = () => {
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(projectsData); // You should maintain rows state for sorting to work properly

  // Define your columns with sortable set to true and editor to TextEditor
 // Define your columns to include all properties from your data
const columns = [
  { key: 'sector', name: 'Sector', sortable: true },
  { key: 'projectName', name: 'Project Name', sortable: true },
  { key: 'location', name: 'Location', sortable: true },
  { key: 'contractSum', name: 'Contract Sum', sortable: true },
  { key: 'budgetAllocation', name: 'Budget Allocation', sortable: true },
  { key: 'amountPaid', name: 'Amount Paid', sortable: true },
  { key: 'contractVariation', name: 'Contract Variation', sortable: true },
  { key: 'implementationStatus', name: 'Implementation Status', sortable: true },
  { key: 'sourceOfFunding', name: 'Source of Funding', sortable: true },
  { key: 'remarks', name: 'Remarks', sortable: true },
];

  // Handler for sort events
  const onSort = (columnKey, direction) => {
    const comparator = (a, b) => {
      if (a[columnKey] === b[columnKey]) return 0;
      if (direction === 'ASC') {
        return a[columnKey] > b[columnKey] ? 1 : -1;
      } else {
        return a[columnKey] < b[columnKey] ? 1 : -1;
      }
    };
    const sortedRows = [...rows].sort(comparator);
    setRows(sortedRows);
  };

  // Handler for page changes
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
// Use the complete projectsData as rows for the DataGrid


  // Calculate the rows to be displayed on the current page
  const paginatedRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Button color="primary" onClick={() => downloadCSV(rows)}>Export to CSV</Button>
                <Button color="primary" onClick={() => {
                  const gridElement = document.getElementById('grid'); 
                  downloadPDF(gridElement);
                }}>Export to PDF</Button>
              </CardHeader>
              <div id="grid"> 
              <DataGrid
                className="light-background"
                columns={columns}
                rows={paginatedRows}
                onSort={onSort}
                sortColumn="sector"
                sortDirection="NONE"
              />
              </div>
              <CardFooter className="py-4">
                {/* Basic Pagination Control */}
                <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage * pageSize >= rows.length}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
