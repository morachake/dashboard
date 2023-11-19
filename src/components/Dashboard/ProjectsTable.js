import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { FilterMatchMode } from 'primereact/api';

export default function ProjectsTable() {
    const [projects, setProjects] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [statuses] = useState(['Stalled', 'Complete', 'Incomplete', 'Cancelled']);
    const [filters, setFilters] = useState({
        global: { value: '', matchMode: FilterMatchMode.CONTAINS },
        // ... other filters
    });
    useEffect(() => {
        fetch('http://127.0.0.1:5000/forms')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value || '';
        setGlobalFilterValue(value);

        setFilters(prevFilters => ({
            ...prevFilters,
            global: { ...prevFilters.global, value: value }
        }));
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
        <div className="card">
            <DataTable value={projects} paginator rows={10} dataKey="user_id" globalFilter={globalFilterValue} header={header} emptyMessage="No projects found.">
                <Column field="project_name" header="Project Name" filter filterPlaceholder="Search by name" />
                <Column field="subcounty" header="Subcounty" filter filterPlaceholder="Search by subcounty" />
                <Column field="ward" header="Ward" filter filterPlaceholder="Search by ward" />
                {/* <Column field="description" header="Description" /> */}
                <Column field="contract_sum" header="Contract Sum" />
                <Column field="contractor_details" header="Contractor Details" />
                <Column field="certificate_number" header="Certificate Number" />
                <Column field="amount_certified" header="Amount Certified" />
                <Column field="status" header="Status" body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                {/* <Column field="remarks" header="Remarks" /> */}
                {/* <Column field="recommendations" header="Recommendations" /> */}
                {/* You may add more columns as needed */}
            </DataTable>
        </div>
    );
}
