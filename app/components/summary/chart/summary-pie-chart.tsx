import { Database } from '@/database.types'
import { Box, Stack, Text } from '@chakra-ui/react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import NotBuyProduct from '../../common/organisms/chart/not-buy-product'

ChartJS.register(ArcElement, Tooltip, Legend)

type UserProfile = Database['public']['Tables']['profile']['Row']
type Product = Database['public']['Tables']['products']['Row']

type Props = {
  userProfile: UserProfile[] | null
  productData: Product[] | null
  selectMonth: number
}

function summaryPieChart({ userProfile, productData, selectMonth }: Props) {
  const userName =
    userProfile && userProfile[0] && userProfile[0].name
      ? userProfile[0].name
      : 'ゲスト'

  function calculateTotalSumByCategory(category: string) {
    let totalSum = 0

    if (productData) {
      for (const item of productData) {
        //dataが存在し、かつstatusがfalseの時に実行
        if (item.date && item.status === false && item.category === category) {
          const itemDate = new Date(item.date)
          const itemMonth = itemDate.getMonth() + 1

          if (itemMonth === selectMonth) {
            totalSum += item.price || 0
          }
        }
      }
    } else {
      console.log('Product is null')
    }
    return totalSum
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
            {userName}の傾向
          </Text>
          <Pie data={data} />
        </Stack>
      </Box>
    )
  } else {
    return <NotBuyProduct />
  }
}
export default React.memo(summaryPieChart)
