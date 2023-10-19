'use client'
import { Database } from '@/database.types'
import { Box, Center } from '@chakra-ui/react'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type Product = Database['public']['Tables']['products']['Row']

type Props = {
  productData: Product[] | null
}

function LineChart({ productData }: Props) {
  function organizeDataByMonth(productData: Product[] | null, status: boolean) {
    if (!productData) return []

    // 各月の金額を格納するオブジェクトを作成({月:金額}という形で格納される)
    const monthlyData: { [month: number]: number } = {}

    //productDataとして入ってくる一つ一つのデータに繰り返し処理を行う
    productData.forEach((product) => {
      //データが存在し,statusがtrueとfalseのものにそれぞれ以下の処理を行う
      if (product.date && product.status === status) {
        const date = new Date(product.date)
        const month = date.getMonth() + 1 // 月を取得

        // 月ごとの金額を計算
        if (!monthlyData[month]) {
          monthlyData[month] = 0
        }
        monthlyData[month] += product.price || 0
      }
    })

    //月ごとのデータを配列に変換
    //以下ではmonthlyDataのキー（month）を取得する
    const monthlyDataArray = Object.keys(monthlyData).map((month) => ({
      month: parseInt(month, 10), // 月を整数に変換
      totalAmount: monthlyData[parseInt(month, 10)], //金額を整数に変換
    }))

    return monthlyDataArray
  }

  //statusがfalse（買った商品）の月ごとの配列を取得
  const monthlyBuyData = organizeDataByMonth(productData, false)
  //statusがtrue（我慢した商品）の月ごとの配列を取得
  const monthlyUnBuyData = organizeDataByMonth(productData, true)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: '月ごとの変化',
      },
    },
  }

  const labels = monthlyUnBuyData?.map((data) => data.month)

  const data = {
    labels,
    datasets: [
      {
        label: '我慢した金額',
        data: monthlyUnBuyData.map((data) => data.totalAmount),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '買った金額',
        data: monthlyBuyData.map((data) => data.totalAmount),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <Box bg="white" borderRadius="10px" shadow="2xl" w="750px" h="350px" p={6}>
      <Center>
        <Box>
          {' '}
          <Line options={options} data={data} width={700} height={300} />
        </Box>
      </Center>
    </Box>
  )
}

export default React.memo(LineChart)
