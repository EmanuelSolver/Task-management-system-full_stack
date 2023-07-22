import '../../stylingFiles/Analytics.css';
import { apiDomain } from '../../utils/utils';
import axios from 'axios';
import { ContextUser } from '../../context/userContext/userContext';
import { useContext, useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';

const Analytics = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const { user } = useContext(ContextUser);
  const [task, setTask] = useState([]);
  const progress = []; // Array to store progress values
  const labels = []; // Array to store task names

  const getData = async () => {
    try {
      const res = await axios.get(`${apiDomain}/tasks/${user.username}`, {
        headers: { Authorization: `${user.token}` },
      });
      setTask(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    getData();
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Populate the 'progress' and 'labels' arrays
    task.forEach((item) => {
      if (
        moment(item.StartDate).isSameOrBefore(moment(), 'day') &&
        item.Progress < 100 &&
        moment(item.CloseDate).isAfter(moment(), 'day')
      ) {
        progress.push(item.Progress);
        labels.push(item.TaskName);
      }
    });

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Progression of Tasks',
            data: progress,
            backgroundColor: ['#58508d', '#bc5090', '#003f5c'],
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
  }, [user.token]); // Add 'user.token' as a dependency to re-render the chart when the token changes

  return (
    <>
      <div className='bar'>
        <canvas ref={chartRef} />
      </div>
    </>
  );
};

export default Analytics;
p
