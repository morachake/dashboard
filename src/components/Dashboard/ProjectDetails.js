import config from 'config';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    fetch(`${config.backendURL}/projects/${projectId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProjectDetails(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [projectId]);

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Project Details: {projectDetails.projectName}</h1>
      <p>Location: {projectDetails.location}</p>
      <p>Sector: {projectDetails.sector}</p>
      <p>Status: {projectDetails.status}</p>
      <p>Budget Allocation: {projectDetails.budgetAllocation?.toLocaleString()}</p>
      <p>Amount Paid: {projectDetails.amountPaid?.toLocaleString()}</p>
      {/* ...and so on for other details */}
    </div>
  );
};

export default ProjectDetails;
