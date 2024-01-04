import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function BudgetBars({ filteredProjects, currentFilter }) {
  // Determine the key for the x-axis based on the current filter
  const labelKey = currentFilter && currentFilter.ward ? 'ward' 
                  : currentFilter && currentFilter.subcounty ? 'subcounty' 
                  : 'sector'; // default to sector if no filter is applied

  const chartData = filteredProjects.map((project) => ({
    label: project[labelKey],
    contractSum: parseFloat(project.contract_sum),
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
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="label" />
        <YAxis />
        {/* <Tooltip /> */}
        <Legend />
        <Bar
          dataKey="contractSum"
          fill="#3498db"
          strokeWidth={2}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
