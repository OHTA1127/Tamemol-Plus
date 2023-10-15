'use client'
import { Box, Stack, Text } from '@chakra-ui/react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import NotBuyProduct from '../../../common/organisms/chart/not-buy-product'

ChartJS.register(ArcElement, Tooltip, Legend)

type Product = {
  category: string | null
  created_at: string
  date: string | null
  detail: string | null
  id: string
  name: string | null
  price: number | null
  status: boolean
  user_id: string | null
}

type Props = {
  productData: Product[] | null
}

function UnbuyDataPieChart({ productData }: Props) {
  function TotalSumByCategory(category: string) {
    let totalSum = 0

    if (productData) {
      for (const item of productData) {
        if (item.status === false && item.category === category) {
          totalSum += item.price || 0
        }
      }
    }
    return totalSum
  }
  const foodTotalSum = TotalSumByCategory('食料品')
  const clotheTotalSum = TotalSumByCategory('衣類')
  const playTotalSum = TotalSumByCategory('遊び')
  const hobbyTotalSum = TotalSumByCategory('趣味')
  const sundriesTotalSum = TotalSumByCategory('雑貨')
  const otherTotalSum = TotalSumByCategory('その他')

  const data = {
    labels: ['食料品', '衣類', '遊び', '趣味', '雑貨', 'その他'],
    datasets: [
      {
        label: '金額',
        data: [
          foodTotalSum,
          clotheTotalSum,
          playTotalSum,
          hobbyTotalSum,
          sundriesTotalSum,
          otherTotalSum,
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

  if (
    foodTotalSum !== 0 ||
    clotheTotalSum !== 0 ||
    playTotalSum !== 0 ||
    hobbyTotalSum !== 0 ||
    sundriesTotalSum !== 0 ||
    otherTotalSum !== 0
  ) {
    return (
      <Box
        bg="white"
        w="440px"
        h="500px"
        borderRadius="10px"
        shadow="2xl"
        p={3}
      >
        <Stack>
          <Text
            pb={2}
            as="b"
            bgClip="text"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            fontSize={{ base: 'xl', md: '2xl' }}
          >
            我慢した商品
          </Text>
          <Pie data={data} />
        </Stack>
      </Box>
    )
  } else {
    return <NotBuyProduct />
  }
}

export default React.memo(UnbuyDataPieChart)
