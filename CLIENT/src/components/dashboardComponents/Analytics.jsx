import '../../stylingFiles/Analytics.css'
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
        labels: ['supervise', 'Database Design', 'Frontend Design', 'Mobile Design', 'Backend', 'Data Analysis', 'Figma mobile design'],
        datasets: [
          {
            label: 'Progression of Tasks',
            data: [9, 100, 32, 45, 73, 100, 24],
            backgroundColor: ['#58508d', '#bc5090', '#003f5c' ],
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
                weight: '800',
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Progress in Percentage', 
              font: {
                weight: '800',
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

  return(
    <div className='bar'>
      <canvas ref={chartRef} />;
    </div>
  ) 
};

export default Analytics;