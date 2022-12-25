import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: number[];
}

export function UsersQuantityChart(props: Props) {

  const options = {
    responsive: true,
    scales: { 
      y: { 
        beginAtZero: true 
      } 
    },
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
  };

  const data = {
    labels: ['Enabled'],
    datasets: [
      {
        label: 'Psychologies Qty',
        data: [props.data[0]],
        backgroundColor: 'rgba(219, 101, 81, 0.2)',
        borderColor: 'rgb(219, 101, 81)',
        borderWidth: 1
      },
      {
        label: 'Patients Qty',
        data: [props.data[1]],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      }
    ]
  };

  return (
    <Bar 
      data={data}
      options={options}
      height={300}
    />
  )
}
