'use client'
import { Database } from '@/database.types'
import { Box, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Product = Database['public']['Tables']['products']['Row']

type Props = {
  productData: Product[] | null
  selectMonth: number
}

//サーバーコンポーネントからpropsとして受け取る
export default function SummaryUnbuyMoney({ productData, selectMonth }: Props) {
  //合計金額が格納されるstate
  const [totalSum, setTotalSum] = useState<number>(0)

  useEffect(() => {
    if (productData) {
      // データが変更された場合、月のデータを再計算
      updateTotalSum()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData, selectMonth])

  const updateTotalSum = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    let totalSum2023 = 0
    let totalSum2024 = 0

    if (productData) {
      for (const item of productData) {
        //dataが存在し、かつstatusがfalseの時に実行
        if (item.date && item.status === true) {
          const itemDate = new Date(item.date)
          const itemMonth = itemDate.getMonth() + 1
          const itemYear = itemDate.getFullYear()

          if (itemMonth === selectMonth && itemYear === 2023) {
            totalSum2023 += item.price || 0
          } else if (itemMonth === selectMonth && itemYear === 2024) {
            totalSum2024 += item.price || 0
          }
        }
      }
    }

    const totalSum = totalSum2023 + totalSum2024
    setTotalSum(totalSum)
  }

  //数字を三桁区切りの文字列に変更
  const formattedTotalSum = totalSum.toLocaleString()

  return (
    <Box
      w="360px"
      h="120px"
      bgGradient="linear(to-r, pink.400, purple.500)"
      borderRadius="10px"
      shadow="2xl"
      p={2}
    >
      <Stack>
        <Text fontSize="md" fontWeight="bold" pt={2} pl={3} color="white">
          我慢した金額
        </Text>
        <Text textAlign="center" fontSize="5xl" fontWeight="bold" color="white">
          ¥ {formattedTotalSum}
        </Text>
      </Stack>
    </Box>
  )
}
