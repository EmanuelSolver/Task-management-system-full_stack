import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Analytics = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Data',
            data: [10, 20, 30],
            backgroundColor: ['red', 'blue', 'green'],
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tasks in Progress',
              font: {
                weight: 'bold',
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Progress in Percentage', 
              font: {
                weight: 'bold',
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default Analytics;
