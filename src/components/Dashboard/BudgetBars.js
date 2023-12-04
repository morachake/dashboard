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

  const getBarColor = (status) => {
    if (status < 30) return '#e74c3c';
    if (status < 60) return '#f39c12';
    return '#27ae60';
  };

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
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="status"
          fill={(entry) => getBarColor(entry.status)}
          stroke="#333" 
          strokeWidth={2} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
