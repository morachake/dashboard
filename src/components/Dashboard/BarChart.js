import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Prepare the data for the chart
      const chartData = {
        labels: data.map((project) => project.name),
        datasets: [
          {
            label: "Status",
            data: data.map((project) => parseFloat(project.status)),
            backgroundColor: data.map((project) => {
              // Apply the same logic for bar colors as in Recharts
              const status = parseFloat(project.status);
              if (status < 30) return "#e74c3c";
              if (status < 60) return "#f39c12";
              return "#27ae60";
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
