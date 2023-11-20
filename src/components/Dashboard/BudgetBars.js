import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import projectsData from '../../data/projectdata'; // Make sure to import your projectsData

export default function BudgetBars(){
  // Transform projectsData into the format expected by Recharts
  const chartData = projectsData.map((project) => ({
    name: project.projectName, // Assuming you want to use the project name as the label on the x-axis
    budgetAllocation: project.budgetAllocation, // The value to be represented by the bars
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budgetAllocation" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
