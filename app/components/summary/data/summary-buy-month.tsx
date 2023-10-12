'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, Spacer, Stack, Text } from '@chakra-ui/react'

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

//サーバーコンポーネントからpropsとして受け取る
function SummaryBuyMoney({ productData, selectMonth }: Props) {
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

    let totalSum = 0

    if (productData) {
      for (const item of productData) {
        //dataが存在し、かつstatusがfalseの時に実行
        if (item.date && item.status) {
          const itemDate = new Date(item.date)
          const itemMonth = itemDate.getMonth() + 1
          const itemYear = itemDate.getFullYear()

          if (itemMonth === selectMonth && itemYear === currentYear) {
            totalSum += item.price || 0
          }
        }
      }
    }

    setTotalSum(totalSum)
  }

  return (
    <Box
      w="360px"
      h="120px"
      bgGradient="linear(to-r, 
        #79F1A4, #0E5CAD)"
      borderRadius="10px"
      shadow="2xl"
      p={2}
    >
      <Stack>
        <Text fontSize="md" fontWeight="bold" pt={2} pl={3} color="white">
          買った金額
        </Text>
        <Text textAlign="center" fontSize="5xl" fontWeight="bold" color="white">
          ¥ {totalSum}
        </Text>
      </Stack>
    </Box>
  )
}

export default React.memo(SummaryBuyMoney)
