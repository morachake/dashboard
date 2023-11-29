import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { FilterMatchMode } from 'primereact/api';
import UserHeader from 'components/Headers/UserHeader';
import { useAuth } from 'context/AuthContext';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Input,
    Button,
    ListGroup,
    ListGroupItem
} from "reactstrap";
export default function MinTable() {
    const { user } = useAuth();
    const [projects, setProjects] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [statuses] = useState(['Stalled', 'Complete', 'Incomplete']);
    const [expandedRows, setExpandedRows] = useState(null); // Changed to manage expanded rows

    useEffect(() => {
        fetch('http://127.0.0.1:5000/forms')
            .then(response => response.json())
            .then(data => {
                const userProjects = data.filter(project => project.user_id === user.id);
                setProjects(userProjects);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [user.id]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value || '';
        setGlobalFilterValue(value);
    };

    const onRowToggle = (e) => {
        setExpandedRows(e.data);
    };

    const rowExpansionTemplate = (data) => {
        return (
            <Card className="expandedRowContent">
                <Col>
                    <Row>
                        <Col>
                            <h5>Details for {data.project_name}</h5>
                            <p>Description: {data.description}</p>
                            <p>Before Images: <a href={data.before_images} target="_blank" rel="noopener noreferrer">View</a></p>
                            <p>After Images: <a href={data.after_images} target="_blank" rel="noopener noreferrer">View</a></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Recommendations: {data.recommendations}</p>
                            <p>Remarks: {data.remarks}</p>
                            <p>Time Frame: {data.time_frame}</p>
                        </Col>
                    </Row>
                </Col>
            </Card>
        );
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'Cancelled': return 'danger';
            case 'Complete': return 'success';
            case 'Stalled': return 'warning';
            case 'Incomplete': return 'info';
            default: return 'secondary';
        }
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select a Status" className="p-column-filter" showClear />
        );
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

    const header = renderHeader();

    return (
        <>
            <UserHeader />
            <Container className="mt--7" fluid>
                <div className="card">
                    <DataTable value={projects} paginator rows={10} dataKey="id"
                        globalFilter={globalFilterValue} header={header}
                        emptyMessage="No projects found."
                        expandedRows={expandedRows}
                        onRowToggle={onRowToggle}
                        rowExpansionTemplate={rowExpansionTemplate}
                    >
                        <Column expander style={{ width: '3em' }} />
                        <Column field="project_name" header="Project Name" filter filterPlaceholder="Search by name" />
                        <Column field="subcounty" header="Subcounty" filter filterPlaceholder="Search by subcounty" />
                        <Column field="ward" header="Ward" filter filterPlaceholder="Search by ward" />
                        <Column field="contract_sum" header="Contract Sum" />
                        <Column field="contractor_details" header="Contractor Details" />
                        <Column field="certificate_number" header="Certificate Number" />
                        <Column field="amount_certified" header="Amount Certified" />
                        <Column field="status" header="Status" body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                    </DataTable>
                </div>
            </Container>
        </>
    );
}
