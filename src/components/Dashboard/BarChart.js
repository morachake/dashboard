import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const chartData = {
        labels: data.map((project) => project.subcounty),
        datasets: [
          {
            label: "Contract Sum",
            data: data.map((project) => parseFloat(project.contract_sum)),
            backgroundColor: data.map(() => {
              return "#3498db"; 
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
