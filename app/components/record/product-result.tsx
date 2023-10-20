import { Database } from '@/database.types'
import { Box, Stack, Text } from '@chakra-ui/react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import React from 'react'
import MonthDate from '../common/atoms/month/month-date'

async function ProductResult() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: profile } = await supabase.from('profile').select()
  const { data: product } = await supabase
    .from('products')
    .select()
    .order('created_at', { ascending: true })

  //現在の日付を取得
  const currentDate = new Date()

  //現在の月と年を取得
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  //初期値の変数を０にする
  let totalSum = 0

  //productがnullでない時に実行
  if (product) {
    for (const item of product) {
      //dataが存在し、かつstatusがtrueの時に実行
      if (item.date && item.status) {
        const itemDate = new Date(item.date)
        const itemMonth = itemDate.getMonth() + 1
        const itemYear = itemDate.getFullYear()

        if (itemMonth === currentMonth && itemYear === currentYear) {
          totalSum += item.price || 0
        }
      }
    }
  } else {
    console.log('Product is null')
  }

  const profileGoalMoney = profile?.[0]?.goal_money || 1000

  const achievementRate = ((totalSum / profileGoalMoney) * 100).toFixed(1)

  return (
    <Box
      w={{ base: '165px', md: '360px' }}
      h={{ base: '70px', md: '120px' }}
      bgGradient="linear(to-r, orange.400, pink.500)"
      borderRadius="10px"
      shadow="2xl"
      p={{ base: 0, md: 2 }}
    >
      <Stack>
        <MonthDate />
        <Text
          textAlign="center"
          fontSize={{ base: 'xl', md: '5xl' }}
          fontWeight="bold"
          color="white"
        >
          {achievementRate}%
        </Text>
      </Stack>
    </Box>
  )
}

export default React.memo(ProductResult)
