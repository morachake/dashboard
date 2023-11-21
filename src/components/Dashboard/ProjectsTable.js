import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { FilterMatchMode } from 'primereact/api';
import { CardHeader } from 'reactstrap';

export default function ProjectsTable({ projectData }) {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [statuses] = useState(['Stalled', 'Complete', 'Incomplete', 'Cancelled']);

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
            case 'Cancelled':
                return 'danger';
            case 'Complete':
                return 'success';
            case 'Stalled':
                return 'warning';
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

    const header = renderHeader();

    return (
        <CardHeader>
            <div className="card">
                <DataTable value={projectData} paginator rows={10} dataKey="id" globalFilter={globalFilterValue} header={header} emptyMessage="No projects found.">
                    <Column field="projectName" header="Project Name" filter filterPlaceholder="Search by name" />
                    <Column field="location" header="Location" filter filterPlaceholder="Search by location" />
                    <Column field="budgetAllocation" header="Budget Allocation" />
                    <Column field="amountPaid" header="Amount Paid" />
                    <Column field="sector" header="Sector" />
                    <Column field="sourceOfFunding" header="Source of Funding" />
                    <Column field="status" header="Status" body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                    {/* You may add more columns as needed based on your JSON */}
                </DataTable>
            </div>
        </CardHeader>
    );
}
