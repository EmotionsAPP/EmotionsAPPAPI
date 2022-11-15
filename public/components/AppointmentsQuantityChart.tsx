import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: {_id: string, count: number}[]
}

export function AppointmentsQuantityChart(props: Props) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Appointments Quantities by Time',
      },
    }
  };

  const labels = useMemo(() => props.data.map(item => item._id), [props.data]);
  const countsPerDay = useMemo(() => props.data.map(item => item.count), [props.data]);

  const data = {
    labels,
    datasets: [
      {
        label: "Qty",
        data: countsPerDay,
        backgroundColor: 'rgba(219, 101, 81, 0.2)',
        borderColor: 'rgb(219, 101, 81)',
        borderWidth: 1
      }
    ]
  };

  return (
    <Line options={options} data={data} height={75} />
  )
}
