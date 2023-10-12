import { Box, Stack, Text } from '@chakra-ui/react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import NotBuyProduct from '../../common/organisms/chart/not-buy-product'

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
  selectMonth: number
}

function summaryPieChart({ productData, selectMonth }: Props) {
  function calculateTotalSumByCategory(category: string) {
    let foodTotalSum = 0

    if (productData) {
      for (const item of productData) {
        //dataが存在し、かつstatusがtrueの時に実行
        if (item.date && item.status === true && item.category === category) {
          const itemDate = new Date(item.date)
          const itemMonth = itemDate.getMonth() + 1

          if (itemMonth === selectMonth) {
            foodTotalSum += item.price || 0
          }
        }
      }
    } else {
      console.log('Product is null')
    }
    return foodTotalSum
  }

  const foodTotalSum = calculateTotalSumByCategory('食料品')
  const clotheTotalSum = calculateTotalSumByCategory('衣類')
  const playTotalSum = calculateTotalSumByCategory('遊び')
  const hobbyTotalSum = calculateTotalSumByCategory('趣味')
  const sundriesTotalSum = calculateTotalSumByCategory('雑貨')
  const otherTotalSum = calculateTotalSumByCategory('その他')

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
        w="400px"
        h="500px"
        borderRadius="10px"
        shadow="2xl"
        p={5}
      >
        <Stack>
          <Text
            pb={6}
            as="b"
            bgClip="text"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            fontSize={{ base: 'xl', md: '2xl' }}
          >
            Buying Trends
          </Text>
          <Pie data={data} />
          <Text
            pt={4}
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
  } else {
    return <NotBuyProduct />
  }
}
export default React.memo(summaryPieChart)
