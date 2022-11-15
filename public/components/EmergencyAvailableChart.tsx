import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: number[]
}

export function EmergencyAvailableChart(props: Props) {

  const data = {
    labels: ['Availables', 'No Availables'],
    datasets: [
      {
        label: 'Emergency Availables Psychologies',
        data: props.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(20, 20, 20, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(20, 20, 20, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={data} />
  )
}