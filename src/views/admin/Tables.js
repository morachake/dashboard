import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { CardHeader, Container } from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader';

export default function ProjectsTable() {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [statuses] = useState(['Stalled', 'Complete', 'Incomplete', 'Cancelled']);
  const [projectData, setProjects] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/projects')
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(data => Array.isArray(data) ? setProjects(data) : console.error('Data is not an array:', data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value || '');
  };

  const onRowToggle = (e) => {
    const currentRowId = e.data.projectId;
    setExpandedRowId(currentRowId === expandedRowId ? null : currentRowId);
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-grid">
        <div className="p-col-12">
          <h5>Details for {data.projectName}</h5>
          {/* Add more details about the project here */}
        </div>
      </div>
    );
  };

  const getSeverity = (status) => {
    switch (status) {
      case 'Complete': return 'success';
      case 'Stalled': return 'danger';
      case 'Incomplete': return 'info';
      default: return 'secondary';
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  const statusRowFilterTemplate = (options) => (
    <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select a Status" className="p-column-filter" showClear />
  );

  const budgetAllocationBodyTemplate = (rowData) => {
    return !rowData || rowData.budgetAllocation == null ? <span>Unknown</span> : <span>{rowData.budgetAllocation.toLocaleString()}</span>;
  };

  const projectNameBodyTemplate = (rowData) => {
    if (!rowData || !rowData.projectName) {
      return <span>Unknown Project</span>;
    }
    const trimmedName = rowData.projectName.length > 25 ? `${rowData.projectName.substring(0, 25)}...` : rowData.projectName;
    return <span title={rowData.projectName}>{trimmedName}</span>;
  };

  const getExpandedRows = () => {
    if (expandedRowId == null) return null;
    const expandedRow = projectData.find(row => row.projectId === expandedRowId);
    return expandedRow ? [expandedRow] : null;
  };

  return (
    <>
    <UserHeader />
    <Container className="mt--7" fluid>
      <CardHeader>
        <div className="card">
          {projectData && projectData.length > 0 ? (
            <DataTable 
              value={projectData}
              paginator 
              rows={10} 
              dataKey="projectId" 
              globalFilter={globalFilterValue}
              emptyMessage="No projects found."
              expandedRows={expandedRowId ? projectData.filter(row => row.projectId === expandedRowId) : null}
              onRowToggle={onRowToggle}
              rowExpansionTemplate={rowExpansionTemplate}
            >
              <Column expander style={{ width: '3em' }} />
              <Column field="projectName" header="Project Name" body={projectNameBodyTemplate} filter filterPlaceholder="Search by name" />
              <Column field="location" header="Location" filter filterPlaceholder="Search by location" />
              <Column field="budgetAllocation" header="Budget Allocation" body={budgetAllocationBodyTemplate} />
              <Column field="sector" header="Sector" />
              <Column field="sourceOfFunding" header="Source of Funding" />
              <Column field="status" header="Status" body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
            </DataTable>
          ) : (
            <div>No data available</div>
          )}
        </div>
      </CardHeader>
    </Container>
  </>

  );
}
