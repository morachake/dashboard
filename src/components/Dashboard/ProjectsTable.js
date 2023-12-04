import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { CardHeader } from 'reactstrap';

export default function ProjectsTable({ projectData }) {
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value || '';
        setGlobalFilterValue(value);
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

    const contractSumBodyTemplate = (rowData) => {
        return <span>{parseFloat(rowData.contract_sum).toLocaleString()}</span>;
    };

    const projectNameBodyTemplate = (rowData) => {
        const trimmedName = rowData.project_name.length > 25 ? `${rowData.project_name.substring(0, 25)}...` : rowData.project_name;
        return <span title={rowData.project_name}>{trimmedName}</span>;
    };

    const navigate = useNavigate();

    const onRowClick = (event) => {
        const rowData = event.data;
        if (rowData.id) {
            navigate(`/admin/project/${rowData.id}`);
        } else {
            console.error('The row data does not have an id property:', rowData);
        }
    };

    const header = renderHeader();

    function shortDesc(text) {
        return text.length > 50 ? `${text.slice(0, 50)}...` : text;
    }

    function descriptionWithTooltip(rowData) {
        const description = shortDesc(rowData.description);

        return (
            <div>
                <span title={rowData.description}>{description}</span>
            </div>
        );
    }

    return (
        <CardHeader>
            <div className="card">
                {projectData && projectData.length > 0 ? (
                    <DataTable value={projectData} paginator rows={10} dataKey="id" globalFilter={globalFilterValue} header={header} onRowClick={onRowClick} emptyMessage="No projects found.">
                        <Column field="project_name" header="Project Name" body={projectNameBodyTemplate} filter filterPlaceholder="Search by name" />
                        <Column field="description" header="Description" body={descriptionWithTooltip} />
                        <Column field="sector" header="Sector" />
                        <Column field="status" header="Status" body={statusBodyTemplate} />
                        <Column field="subcounty" header="Subcounty" />
                        <Column field="ward" header="Ward" />
                        <Column field="contract_sum" header="Contract Sum" body={contractSumBodyTemplate} />
                        {/* Additional columns can be added as needed */}
                    </DataTable>
                ) : (
                    <div>No data available</div>
                )}
            </div>
        </CardHeader>
    );
}
