import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function BudgetBars({ filteredProjects }) {
  const chartData = filteredProjects.map((project) => ({
    name: project.project_name,
    status: parseFloat(project.status),
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
        <CartesianGrid  strokeDasharray="5 5" />
        <XAxis dataKey="name" fill="#3498db"/>
        <YAxis domain={[0, 100]} />
        {/* <Tooltip /> */}
        <Legend />
        <Bar
          dataKey="status"
          fill="#3498db"
          strokeWidth={2} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
