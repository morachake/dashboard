import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const BarChart = ({ data, isWardFilterApplied, currentWardFilter }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef();

  // Function to generate labels for the chart
  const generateLabelsAndData = () => {
    let labels, chartData;

    if (isWardFilterApplied) {
      // Logic for ward labels
      labels = data.flatMap(project =>
        project.locations
          .filter(loc => loc.ward === currentWardFilter)
          .map(loc => loc.ward)
      );
      chartData = data.flatMap(project =>
        project.locations
          .filter(loc => loc.ward === currentWardFilter)
          .map(() => parseFloat(project.contract_sum))
      );
    } else {
      // Logic for subcounty labels
      labels = data.flatMap(project =>
        project.locations.map(loc => loc.subcounty)
      );
      chartData = data.flatMap(project =>
        project.locations.map(() => parseFloat(project.contract_sum))
      );
    }

    // Remove duplicates and undefined values
    labels = labels.filter((v, i, a) => v && a.indexOf(v) === i);
    return { labels, chartData };
  };

  useEffect(() => {
    // Chart initialization
    if (!chartInstance.current && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        options: {
          scales: {
            yAxes: [{ ticks: { beginAtZero: true } }],
          },
          hover: { mode: null }, // Disable hover effects
        },
      });
    }

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Update chart data when data or filter changes
    if (chartInstance.current) {
      const { labels, chartData } = generateLabelsAndData();
      const ctx = chartRef.current.getContext('2d');
      
       chartInstance.current = new Chart(ctx, {
      type: 'bar',
      options: {
        maintainAspectRatio: false, // Add this line
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }],
        },
        hover: { mode: null },
      },
    });
  
      chartInstance.current.update();
    }
  }, [data, isWardFilterApplied, currentWardFilter]);

  return <canvas ref={chartRef} className='chart-canvas'></canvas>;
};

export default BarChart;
