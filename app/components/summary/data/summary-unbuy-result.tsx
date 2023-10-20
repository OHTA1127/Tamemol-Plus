'use client'
import { Database } from '@/database.types'
import { Box, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Product = Database['public']['Tables']['products']['Row']

type Profile = {
  created_at: string
  goal_money: number | null
  id: string
  name: string | null
  user_id: string | null
}

type Props = {
  productData: Product[] | null
  userProfile: Profile[] | null
  selectMonth: number
}

export default function SummaryUnbuyResult({
  productData,
  userProfile,
  selectMonth,
}: Props) {
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
        //dataが存在し、かつstatusがtrueの時に実行
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

  const profileGoalMoney = userProfile?.[0]?.goal_money || 1000

  const achievementRate = ((totalSum / profileGoalMoney) * 100).toFixed(1)

  return (
    <Box
      w="360px"
      h="120px"
      bgGradient="linear(to-r, orange.400, pink.500)"
      borderRadius="10px"
      shadow="2xl"
      p={2}
    >
      <Stack>
        <Text fontSize="md" fontWeight="bold" pt={2} pl={3} color="white">
          達成率
        </Text>
        <Text textAlign="center" fontSize="5xl" fontWeight="bold" color="white">
          {achievementRate}%
        </Text>
      </Stack>
    </Box>
  )
}
