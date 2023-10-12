'use client'
import { Box, Stack, Text } from '@chakra-ui/react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'

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
    <Box bg="white" w="390px" h="500px" borderRadius="10px" shadow="2xl" p={3}>
      <Stack>
        <Text
          pb={3}
          as="b"
          bgClip="text"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          Buying Trends
        </Text>
        <Pie data={data} />
        <Text
          pt={6}
          align="center"
          as="b"
          bgClip="text"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          fontSize={{ base: 'sm', md: 'md' }}
        >
          よく買うものをチェック！
        </Text>
      </Stack>
    </Box>
  )
}

export default React.memo(PieChart)
