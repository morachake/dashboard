import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { CardHeader , Container } from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader';

export default function ProjectsTable() {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [statuses] = useState(['Stalled', 'Complete', 'Incomplete', 'Cancelled']);
  const [projectData, setProjects] = useState([]);
  const onGlobalFilterChange = (e) => {
    const value = e.target.value || '';
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/projects')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

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
  console.log("project Data", projectData)
  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  };

  const getSeverity = (status) => {
    switch (status) {
      case 'Complete':
        return 'success';
      case 'Stalled':
        return 'danger';
      case 'Incomplete':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select a Status" className="p-column-filter" showClear />
    );
  };
  const budgetAllocationBodyTemplate = (rowData) => {
    if (!rowData || rowData.budgetAllocation == null) {
      return <span>Unknown</span>;
    }
    const formattedBudget = rowData.budgetAllocation.toLocaleString();
    return <span>{formattedBudget}</span>;
  };

  const projectNameBodyTemplate = (rowData) => {
    if (!rowData || !rowData.projectName) {
      return <span>Unknown Project</span>;
    }
    const trimmedName = rowData.projectName.length > 25 ? `${rowData.projectName.substring(0, 25)}...` : rowData.projectName;
    return <span title={rowData.projectName}>{trimmedName}</span>;
  };
  const navigate = useNavigate();

  const onRowClick = (event) => {
    const rowData = event.data; // Access the actual row data
    console.log("Actual row data:", rowData); // This will log the actual row data
    if (rowData.id) {
      navigate(`/admin/project/${rowData.id}`);
    } else {
      console.error('The actual row data does not have an id property:', rowData);
    }
  };



  return (
    <>
      <UserHeader/>
      <Container className="mt--7" fluid>
          <CardHeader>
        <div className="card">
          {projectData && projectData.length > 0 ? (
            <DataTable value={projectData} paginator rows={10} dataKey="projectId" globalFilter={globalFilterValue}  emptyMessage="No projects found.">
              <Column field="projectName" header="Project Name" body={projectNameBodyTemplate} filter filterPlaceholder="Search by name" />
              <Column field="location" header="Location" filter filterPlaceholder="Search by location" />
              <Column field="budgetAllocation" header="Budget Allocation" body={budgetAllocationBodyTemplate} />
              <Column field="sector" header="Sector" />
              <Column field="sourceOfFunding" header="Source of Funding" />
              <Column field="status" header="Status" body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
            </DataTable>
          ) : (
            <div>No data available</div>
          )
          }
        </div>
      </CardHeader>
      </Container>
    
    </>

  );
}
