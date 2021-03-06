import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const options = {
  scales: {
    x: {
      offset: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

const AptPriceChart = ({ monthData }) => {
  const labels = monthData.map((e) => {
    return `${e.dealYear}-${e.dealMonth}-${e.dealDay}`
  })

  const amount = monthData.map((e) => e.dealAmount)

  const data = {
    labels,
    datasets: [
      {
        data: amount,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return <Line options={options} data={data} />
}

export default AptPriceChart
