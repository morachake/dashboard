import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Prepare the data for the chart
      const chartData = {
        labels: data.map((project) => project.subcounty), // Use "subcounty" as labels
        datasets: [
          {
            label: "Contract Sum",
            data: data.map((project) => parseFloat(project.contract_sum)),
            backgroundColor: data.map(() => {
              // You can set a single color for all bars if needed
              return "#3498db"; // Blue color as an example
            }),
          },
        ],
      };

      new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
