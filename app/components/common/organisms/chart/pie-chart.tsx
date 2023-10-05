'use client'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Box } from '@chakra-ui/react'

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  foodData: number
  clotheData: number
  playData: number
  hobbyData: number
  sundriesData: number
  otherData: number
}

function PieChart({
  foodData,
  clotheData,
  playData,
  hobbyData,
  sundriesData,
  otherData,
}: Props) {
  const data = {
    labels: ['食料品', '衣類', '遊び', '趣味', '雑貨', 'その他'],
    datasets: [
      {
        label: '金額',
        data: [
          foodData,
          clotheData,
          playData,
          hobbyData,
          sundriesData,
          otherData,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <Box bg="white">
      <Pie data={data} />
    </Box>
  )
}

export default React.memo(PieChart)
