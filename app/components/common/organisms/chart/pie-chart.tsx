'use client'
import { Database } from '@/database.types'
import { Box, Stack, Text } from '@chakra-ui/react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

type UserProfile = Database['public']['Tables']['profile']['Row']

type Props = {
  userProfile: UserProfile[] | null
  foodData: number
  clotheData: number
  playData: number
  hobbyData: number
  sundriesData: number
  otherData: number
}

export default function PieChart({
  userProfile,
  foodData,
  clotheData,
  playData,
  hobbyData,
  sundriesData,
  otherData,
}: Props) {
  const userName =
    userProfile && userProfile[0] && userProfile[0].name
      ? userProfile[0].name
      : 'ゲスト'

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

  const options = {
    maintainAspectRatio: true,
    responsive: true,
  }

  return (
    <Box
      bg="white"
      w={{ base: '160px', md: '390px' }}
      h={{ base: '350px', md: '500px' }}
      borderRadius="10px"
      shadow="2xl"
      p={3}
    >
      <Stack>
        <Text
          pb={{ base: 1, md: 3 }}
          as="b"
          bgClip="text"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          fontSize={{ base: 'sm', md: '2xl' }}
        >
          {userName}の傾向
        </Text>
        <Pie data={data} options={options} />
        <Text
          pt={{ base: 4, md: 6 }}
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
