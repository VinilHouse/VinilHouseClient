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
}

const AptPriceChart = ({ monthData }) => {
  console.log('aptpriceChart')
  console.log(monthData)
  // const labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  // ]

  const labels = monthData.map((e) => {
    return `${e.dealYear}-${e.dealMonth}-${e.dealDay}`
  })

  console.log(labels)
  const amount = monthData.map((e) => e.dealAmount)

  console.log(amount)
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: amount,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return <Line options={options} data={data} />
}

export default AptPriceChart
