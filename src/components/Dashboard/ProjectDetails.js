import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Replace with the actual API call to fetch project details
    fetch(`http://127.0.0.1:5000/projects/${projectId}`)
      .then(response => response.json())
      .then(data => setProjectDetails(data))
      .catch(error => console.error('Error:', error));
  }, [projectId]);

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Project Details: {projectDetails.name}</h1>
      {/* Render the details of the project */}
    </div>
  );
};

export default ProjectDetails;
