import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import PropTypes from 'prop-types';

const BarChart = ({ data, currentFilter }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current ? chartRef.current.getContext("2d") : null;

    if (ctx && data.length > 0) {
      // Determine label based on current filter
      let labelType;
      if (currentFilter && currentFilter.ward) {
        labelType = 'ward';
      } else if (currentFilter && currentFilter.subcounty) {
        labelType = 'subcounty';
      } else if (currentFilter && currentFilter.sector) {
        labelType = 'sector';
      } else {
        // Default label type if no filter is applied
        labelType = 'subcounty';
      }

      const chartData = {
        labels: data.map((item) => item[labelType] || ''),
        datasets: [
          {
            label: "Contract Sum",
            data: data.map((item) => parseFloat(item.contract_sum)),
            backgroundColor: data.map(() => "#3498db"),
          },
        ],
      };

      // Initialize or update chart
      if (window.myBarChart) {
        window.myBarChart.destroy();
      }

      window.myBarChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            yAxes: [{
              ticks: { beginAtZero: true }
            }],
          },
          hover: { mode: 'none' }, // Disables hover effects
          tooltips: { enabled: false } // Disables tooltips on hover
        }
      });
    }
  }, [data, currentFilter]);

  return <canvas ref={chartRef}></canvas>;
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  currentFilter: PropTypes.object.isRequired,
};

export default BarChart;
